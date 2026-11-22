-- Asistensia Learn — run once in Supabase: Dashboard → SQL Editor → New query → Run.

-- Lesson progress (one row per completed lesson)
create table if not exists public.lesson_progress (
  user_id      uuid not null references auth.users on delete cascade,
  course_slug  text not null,
  lesson_slug  text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, course_slug, lesson_slug)
);
alter table public.lesson_progress enable row level security;
create policy "progress: read own"   on public.lesson_progress for select using (auth.uid() = user_id);
create policy "progress: add own"    on public.lesson_progress for insert with check (auth.uid() = user_id);
create policy "progress: remove own" on public.lesson_progress for delete using (auth.uid() = user_id);

-- Course access for premium lessons. Students can only READ their own rows;
-- rows are created by you (dashboard / SQL) or later by a payment webhook (service role).
create table if not exists public.enrollments (
  user_id     uuid not null references auth.users on delete cascade,
  course_slug text not null,
  status      text not null default 'active' check (status in ('active', 'revoked')),
  source      text not null default 'manual',      -- manual | lemonsqueezy | stripe | ...
  created_at  timestamptz not null default now(),
  primary key (user_id, course_slug)
);
alter table public.enrollments enable row level security;
create policy "enrollments: read own" on public.enrollments for select using (auth.uid() = user_id);

-- Give a student full access to a course (they must have signed in once first):
-- insert into public.enrollments (user_id, course_slug)
-- select id, 'rails' from auth.users where email = 'student@example.com'
-- on conflict (user_id, course_slug) do update set status = 'active';
