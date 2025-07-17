import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Asistensia - Ruby, PHP & DevOps Consulting</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Tailored software development and consulting services including Ruby, Rails, Ruby On Rails PHP, Laravel, DevOps and API integrations."
        />
        <meta property="og:title" content="Asistensia - Software Consulting" />
        <meta
          property="og:description"
          content="We build scalable and secure software solutions."
        />
        <meta property="og:image" content="/og-image.png" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                Asistensia
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/#about" className="text-gray-700 hover:text-primary">
                About Us
              </a>
              <a href="/#services" className="text-gray-700 hover:text-primary">
                Services
              </a>
               <a href="/#services" className="text-gray-700 hover:text-primary">
                Privacy
              </a>
               <a href="/#services" className="text-gray-700 hover:text-primary">
                Terms
              </a>
              <a href="/blog" className="text-gray-700 hover:text-primary">
                Blog
              </a>
              <a href="/#contact" className="text-gray-700 hover:text-primary">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Asistensia</h3>
              <p className="text-gray-400 max-w-xs">
                Expert software consulting services for Ruby, PHP, and DevOps
                solutions.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Services
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Ruby on Rails
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      PHP & Laravel
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="/#about"
                      className="text-gray-400 hover:text-white"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="/#contact"
                      className="text-gray-400 hover:text-white"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            &copy; 2025 Asistensia. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
