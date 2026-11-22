"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { getSupabaseBrowser } from "@/lib/supabase/client";

/** Small "signed in as … / sign out" bar shown on course pages. */
export default function AccountBar() {
  const t = useTranslations("Learn");
  const pathname = usePathname();
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!supabase) return setEmail(null);
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, [supabase]);

  // Not configured yet → still show "Sign in" (the login page explains it's not available yet).
  if (supabase && email === undefined) return <div className="h-5" aria-hidden="true" />;

  return (
    <div className="flex items-center justify-end gap-3 text-sm text-muted">
      {email ? (
        <>
          <span>{t("signedInAs", { email })}</span>
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="font-semibold text-secondary hover:underline">{t("signOut")}</button>
          </form>
        </>
      ) : (
        <Link href={`/learn/login?next=${pathname}`} className="font-semibold text-secondary hover:underline">{t("signIn")}</Link>
      )}
    </div>
  );
}
