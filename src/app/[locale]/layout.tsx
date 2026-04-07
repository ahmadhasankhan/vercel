import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://asistensia.com"),
    title: {
        default: "Asistensia - Consulting Experts",
        template: "%s | Asistensia",
    },
    description:
        "Tailored software consulting services with Ruby, Laravel, DevOps, and API solutions. Based in Netherlands, serving global clients.",
    keywords: [
        "Asistensia",
        "Ruby",
        "Ruby Develop",
        "Ruby Engineer",
        "Develop",
        "Ruby on Rails",
        "Laravel",
        "DevOps",
        "API development",
        "Software consulting",
    ],
    openGraph: {
        title: "Asistensia - Ruby on Rails Consulting Experts",
        description:
            "Tailored software consulting services with Ruby, Laravel, DevOps, and API solutions.",
        url: "https://asistensia.com",
        siteName: "Asistensia",
        images: [
            {
                url: "/og-image.png", // resolved against metadataBase
                width: 1200,
                height: 630,
                alt: "Asistensia Consulting",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Asistensia - Ruby Consulting",
        description: "Tailored software consulting services for your business.",
        images: ["/og-image.png"],
    },
};

export default async function RootLayout({
                                       children,
                                       params
                                   }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    const {locale} = await params;

    // Validate that the incoming `locale` parameter is valid
    if (!['en', 'nl', 'ar'].includes(locale)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    // Site-wide Organization JSON-LD
    const orgJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Asistensia",
        url: `https://asistensia.com/${locale}`,
        inLanguage: locale,
        areaServed: [
            { "@type": "Country", name: "United States" },
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Country", name: "Saudi Arabia" },
            { "@type": "Country", name: "United Arab Emirates" },
            { "@type": "Country", name: "Netherlands" }
        ],
    };

    return (
        <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <head>
            <link rel="icon" href="/favicon.ico" />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
            />
        </head>
        <body
            className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50`}
        >
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>

        {/* Google Analytics */}
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-8W8PKL59B2"
            strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8W8PKL59B2');
          `}
        </Script>
        </body>
        </html>
    );
}
