import createMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./lib/supabase/config";

const handleI18n = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const res = handleI18n(req);

  // Keep the Supabase session fresh on course pages (sign-in, progress, premium lessons).
  if (isSupabaseConfigured && /(^|\/)learn(\/|$)/.test(req.nextUrl.pathname)) {
    const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (list) => list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)),
      },
    });
    await supabase.auth.getUser();
  }

  return res;
}

export const config = {
  // Match both internationalized pathnames and the root,
  // excluding API routes, internal Next.js paths and static files.
  matcher: ["/((?!api|_next|assets|.*\\..*).*)"],
};
