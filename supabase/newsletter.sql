-- Asistensia newsletter — run once in Supabase: SQL Editor → New query → paste → Run.
-- Visitors never read or write the table directly; they can only call the two functions below.

create table if not exists public.newsletter_subscribers (
  id                uuid primary key default gen_random_uuid(),
  email             text not null unique check (email = lower(email)),
  locale            text not null default 'en',
  source            text not null default 'footer',
  consent_text      text not null,                       -- exact wording the person agreed to (GDPR proof)
  status            text not null default 'subscribed' check (status in ('pending', 'subscribed', 'unsubscribed')),
  unsubscribe_token uuid not null default gen_random_uuid() unique,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  unsubscribed_at   timestamptz
);
alter table public.newsletter_subscribers enable row level security;   -- no policies = no direct access

create or replace function public.newsletter_subscribe(p_email text, p_locale text, p_source text, p_consent text)
returns void
language plpgsql security definer set search_path = public as $$
declare v_email text := lower(trim(p_email));
begin
  if v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' or length(v_email) > 254 then
    raise exception 'invalid email';
  end if;
  insert into newsletter_subscribers (email, locale, source, consent_text)
  values (v_email, coalesce(nullif(p_locale, ''), 'en'), coalesce(nullif(p_source, ''), 'footer'), p_consent)
  on conflict (email) do update
    set status = 'subscribed', locale = excluded.locale, consent_text = excluded.consent_text,
        unsubscribed_at = null, updated_at = now();
end $$;

create or replace function public.newsletter_unsubscribe(p_token uuid)
returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  update newsletter_subscribers
     set status = 'unsubscribed', unsubscribed_at = now(), updated_at = now()
   where unsubscribe_token = p_token and status <> 'unsubscribed';
  get diagnostics n = row_count;
  return n > 0;
end $$;

revoke all on function public.newsletter_subscribe(text, text, text, text) from public;
revoke all on function public.newsletter_unsubscribe(uuid) from public;
grant execute on function public.newsletter_subscribe(text, text, text, text) to anon, authenticated;
grant execute on function public.newsletter_unsubscribe(uuid) to anon, authenticated;

-- Export your mailing list (paste the unsubscribe_url into each email you send):
-- select email, locale,
--        'https://asistensia.com/newsletter/unsubscribe?token=' || unsubscribe_token as unsubscribe_url
--   from newsletter_subscribers where status = 'subscribed' order by created_at;
