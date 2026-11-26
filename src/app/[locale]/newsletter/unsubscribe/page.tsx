import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "../../components/Layout";
import { Link } from "@/i18n/routing";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/config";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ token?: string }> };

export const metadata: Metadata = { robots: { index: false, follow: false } };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function UnsubscribePage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token = "" } = await searchParams;
  const f = await getTranslations({ locale, namespace: "Footer" });

  let ok = false;
  if (isSupabaseConfigured && UUID_RE.test(token)) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: false } });
    const { data } = await supabase.rpc("newsletter_unsubscribe", { p_token: token });
    ok = data === true;
  }

  return (
    <Layout>
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-primary/10">
          <h1 className="text-2xl font-bold text-primary">{f("unsubTitle")}</h1>
          <p className="mt-3 text-muted">{ok ? f("unsubSuccess") : f("unsubInvalid")}</p>
          <Link href="/" className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 font-semibold text-white hover:bg-secondary">
            {f("backHome")}
          </Link>
        </div>
      </section>
    </Layout>
  );
}
