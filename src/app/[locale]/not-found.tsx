import {Link} from '@/i18n/routing';
import Layout from './components/Layout';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-primary mb-6">{t("title")}</h2>
        <p className="text-muted max-w-md mb-8">
          {t("text")}
        </p>
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary transition duration-300"
          >
            {t("home")}
          </Link>
          <Link
            href="/blog"
            className="bg-surface-strong text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/15 transition duration-300"
          >
            {t("blog")}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
