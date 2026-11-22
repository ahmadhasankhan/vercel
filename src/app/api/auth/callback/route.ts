import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

/** Magic-link and GitHub sign-in land here; we exchange the code for a session cookie. */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const nextParam = url.searchParams.get("next") ?? "/learn";
  // only allow relative redirects back into the site
  const next = nextParam.startsWith("/") && !nextParam.startsWith("//") ? nextParam : "/learn";

  const supabase = await getSupabaseServer();
  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  const fail = new URL(next.replace(/\/learn.*$/, "/learn/login"), url.origin);
  fail.searchParams.set("error", "1");
  return NextResponse.redirect(fail);
}
