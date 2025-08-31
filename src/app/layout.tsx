import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  title: { default: "Asistensia - onsulting Experts", template: "%s | Asistensia" },
  description: 'Tailored software consulting services with Ruby, Laravel, DevOps, and API solutions. Based in Amsterdam, serving global clients.',
  keywords: ['Ruby', 'Ruby Develop', 'Ruby Engineer','Develop', 'Ruby on Rails', 'Laravel', 'DevOps',
    'API development', 'Software consulting'],
  openGraph: {
    title: 'Asistensia - Ruby on Rails Consulting Experts',
    description: 'Tailored software consulting services with Ruby, Laravel, DevOps, and API solutions.',
    url: 'https://asistensia.com',
    siteName: 'Asistensia',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Asistensia Consulting',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asistensia - Ruby Consulting',
    description: 'Tailored software consulting services for your business.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-gray-50`}>
        {children}

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
