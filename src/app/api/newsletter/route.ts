import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";
import { LOCALES } from "@/lib/site";

/** Exact consent wording stored with every sign-up (proof of consent under GDPR). */
const CONSENT_TEXT =
  "Footer form on asistensia.com: 'By subscribing you agree to receive our newsletter. You can unsubscribe at any time.'";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let body: { email?: string; locale?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field — pretend success, store nothing.
  if (body.website) return NextResponse.json({ ok: true });

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const locale = (LOCALES as readonly string[]).includes(body.locale ?? "") ? body.locale! : "en";
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
  const { error } = await supabase.rpc("newsletter_subscribe", {
    p_email: email,
    p_locale: locale,
    p_source: "footer",
    p_consent: CONSENT_TEXT,
  });

  if (error) {
    console.error("newsletter_subscribe failed:", error.message);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
  // Same answer for new and existing addresses (doesn't reveal who is subscribed).
  return NextResponse.json({ ok: true });
}
