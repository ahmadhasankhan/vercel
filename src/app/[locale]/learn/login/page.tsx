import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Layout from "../../components/Layout";
import LoginForm from "./LoginForm";

type Props = { params: Promise<{ locale: string }>; searchParams: Promise<{ next?: string; error?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Learn" });
  return { title: t("loginTitle"), robots: { index: false, follow: false } };
}

export default async function LoginPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { next = "/learn", error } = await searchParams;
  const t = await getTranslations({ locale, namespace: "Learn" });

  return (
    <Layout>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-primary/10">
          <h1 className="text-2xl font-bold text-primary">{t("loginTitle")}</h1>
          <p className="mt-2 mb-6 text-muted">{t("loginSubtitle")}</p>
          <LoginForm next={next} error={!!error} />
        </div>
      </section>
    </Layout>
  );
}
