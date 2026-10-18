import { useTranslations } from "next-intl";
import { BOOKING_URL } from "@/lib/site";

export default function ContactSection() {
    const t = useTranslations("Contact");
    return (
        <section id="contact" className="py-5 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold  text-primary mb-4">{t("title")}</h2>
                    <p className="text-xl text-muted max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="lg:flex">
                    {/* Form Section */}
                    <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pe-12">
                        <form action="https://formspree.io/f/xovwgvnv" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-muted">
                                    {t("name")}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-muted">
                                    {t("email")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-muted">
                                    {t("message")}
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md  hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                >
                                    {t("send")}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Contact Info Section */}
                    <div className="lg:w-1/2 lg:ps-12 space-y-6">
                        <div className="bg-primary text-white p-8 rounded-lg">
                            <h3 className="text-xl font-semibold mb-2">{t("talkTitle")}</h3>
                            <p className="text-white/80 mb-6">
                                {t("talkText")}
                            </p>
                            <a
                                href={BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-surface-strong transition duration-300"
                            >
                                {t("talkButton")} <span aria-hidden="true" className="rtl:rotate-180 inline-block">&rarr;</span>
                            </a>
                        </div>
                        <div className="bg-surface p-8 rounded-lg">
                            <h3 className="text-xl font-semibold mb-6 text-primary ">{t("infoTitle")}</h3>
                            <div className="space-y-4">
                                <ContactItem
                                    title={t("phone")}
                                    detail="+31-619-333008"
                                    href="tel:+31619333008"
                                    icon={
                                        <PhoneIcon className="h-6 w-6 text-secondary  mt-1 me-4" />
                                    }
                                />
                                <ContactItem
                                    title={t("emailLabel")}
                                    detail="contact [at] asistensia.com"
                                    href="mailto:contact@asistensia.com"
                                    icon={
                                        <MailIcon className="h-6 w-6 text-secondary mt-1 me-4" />
                                    }
                                />
                                <ContactItem
                                    title={t("address")}
                                    detail={t("addressValue")}
                                    icon={
                                        <LocationIcon className="h-6 w-6 text-secondary mt-1 me-4" />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactItem({
                         title,
                         detail,
                         icon,
                         href,
                     }: {
    title: string;
    detail: string;
    icon: React.ReactNode;
    href?: string;
}) {
    return (
        <div className="flex items-start">
            {icon}
            <div>
                <h4 className="font-medium text-primary">{title}</h4>
                {href ? (
                    <a href={href} dir="ltr" className="text-muted hover:text-secondary transition-colors">
                        {detail}
                    </a>
                ) : (
                    <p className="text-muted">{detail}</p>
                )}
            </div>
        </div>
    );
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
        </svg>
    );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
        </svg>
    );
}

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    );
}
