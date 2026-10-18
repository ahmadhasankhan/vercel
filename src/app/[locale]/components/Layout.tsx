import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslations } from "next-intl";
import { CookieSettingsButton } from "./CookieConsent";
import LanguageSwitcher from "./LanguageSwitcher";
import { BOOKING_URL, BRAND, SITE_NAME, SOCIALS } from "@/lib/site";

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const year = new Date().getFullYear();
  const t = useTranslations("Nav");
  const f = useTranslations("Footer");
  const c = useTranslations("Cookies");

  return (
    <>
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav aria-label="Main" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" aria-label={t("homeAria")} className="flex items-center">
                <Image
                  src={BRAND.logoSvg}
                  alt={SITE_NAME}
                  width={BRAND.logoWidth}
                  height={BRAND.logoHeight}
                  priority
                  className="h-9 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#about" className="text-muted hover:text-secondary">
                {t("aboutUs")}
              </Link>
              <Link href="/#services" className="text-muted hover:text-secondary">
                {t("services")}
              </Link>
              <Link href="/privacy" className="text-muted hover:text-secondary">
                {t("privacy")}
              </Link>
              <Link href="/blog" className="text-muted hover:text-secondary">
                {t("blog")}
              </Link>
              <Link href="/#contact" className="text-muted hover:text-secondary">
                {t("contact")}
              </Link>
              <LanguageSwitcher />
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-secondary transition duration-300"
              >
                {t("bookCall")}
              </a>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <LanguageSwitcher compact />
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="self-center bg-primary text-white text-sm font-semibold px-3 py-2 rounded-lg hover:bg-secondary"
            >
              {t("bookCall")}
            </a>
            </div>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      {/* Floating "Schedule a meeting" button — visible on every page */}
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("scheduleAria")}
        className="fixed bottom-5 end-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary text-white font-semibold px-5 py-3 shadow-lg shadow-primary/30 ring-1 ring-white/10 hover:bg-secondary transition duration-300"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        <span>{t("schedule")}</span>
      </a>

      {/* Footer */}
      <footer className="bg-surface text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <Link href="/" aria-label={t("homeAria")} className="inline-block mb-4">
                <Image
                  src={BRAND.logoSvg}
                  alt={SITE_NAME}
                  width={BRAND.logoWidth}
                  height={BRAND.logoHeight}
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-muted max-w-xs">{f("tagline")}</p>
              <p className="text-muted leading-relaxed pt-5 font-medium max-w-md">{f("extend")}</p>

              <p className="font-bold text-primary uppercase pt-8">{f("newsletterTitle")}</p>
              <p className="text-muted leading-relaxed pt-5 font-medium max-w-md">{f("newsletterText")}</p>
              <form className="mt-10">
                <label htmlFor="newsletter-email" className="sr-only">
                  {f("emailLabel")}
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={f("emailPlaceholder")}
                  className="p-1 w-44 border-1 border-gray-200 text-primary focus:outline-none focus:ring-primary focus:border-primary shadow-sm"
                />
                <button
                  type="submit"
                  className="text-white bg-primary px-4 py-1 hover:bg-secondary"
                >
                  {f("subscribe")}
                </button>
              </form>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary">
                  {f("servicesTitle")}
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog/ruby-on-rails-consulting" className="text-muted hover:text-secondary">
                      {f("railsConsulting")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/php-laravel-consulting" className="text-muted hover:text-secondary">
                      {f("laravelConsulting")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/devops-consulting" className="text-muted hover:text-secondary">
                      {f("devopsConsulting")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/rails-upgrade" className="text-muted hover:text-secondary">
                      {f("railsUpgrades")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/rails-performance-audit" className="text-muted hover:text-secondary">
                      {f("railsAudit")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary">
                  {f("companyTitle")}
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link href="/#about" className="text-muted hover:text-secondary">
                      {f("about")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted hover:text-secondary">
                      {f("blog")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/#contact" className="text-muted hover:text-secondary">
                      {f("contact")}
                    </Link>
                  </li>
                  <li>
                    <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-secondary">
                      {f("bookFreeCall")}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary">
                  {f("legalTitle")}
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link href="/privacy" className="text-muted hover:text-secondary">
                      {f("privacy")}
                    </Link>
                  </li>
                  <li>
                    <CookieSettingsButton
                      label={c("settings")}
                      className="text-muted hover:text-secondary text-start"
                    />
                  </li>
                </ul>
              </div>

              {/* Social media links */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-primary">
                  {f("socialsTitle")}
                </p>
                <div className="flex gap-8">
                  <a href={SOCIALS.twitter} aria-label="Asistensia on X (Twitter)" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faXTwitter} className="text-primary h-6 hover:text-secondary" />
                  </a>
                  <a href={SOCIALS.facebook} aria-label="Asistensia on Facebook" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebookF} className="text-primary h-6 hover:text-secondary" />
                  </a>
                  <a href={SOCIALS.linkedin} aria-label="Asistensia on LinkedIn" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} className="text-primary h-6 hover:text-secondary" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary/15 text-center text-primary text-sm">
            {f("rights", { year })}
          </div>
        </div>
      </footer>
    </>
  );
}
