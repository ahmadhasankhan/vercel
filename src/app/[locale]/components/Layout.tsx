import { Link } from "@/i18n/routing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";


export default function Layout({ children }: { children: React.ReactNode }) : React.JSX.Element {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Asistensia",
    "url": "https://asistensia.com",
    "logo": "https://asistensia.com/assets/brand/logo.png",
    "image": "https://asistensia.com/assets/brand/logo.png",
    "telephone": "+31619333008",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[Street and number]",
      "addressLocality": "Amsterdam",
      "postalCode": "[POSTCODE]",
      "addressCountry": "NL"
    },
    "sameAs": [
      "https://www.linkedin.com/company/[handle]",
      "https://github.com/[handle]"
    ]
  };

  return (
    <>

      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                Asistensia
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#about" className="text-gray-700 hover:text-[#1bb1dc]">
                About us
              </Link>
              <Link href="/#services" className="text-gray-700 hover:text-[#1bb1dc]">
                Services
              </Link>
               <Link href="/privacy" className="text-gray-700 hover:text-[#1bb1dc]">
                Privacy Policy
              </Link>
               <Link href="/#services" className="text-gray-700 hover:text-[#1bb1dc]">
                Terms
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#1bb1dc]">
                Blog
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-[#1bb1dc]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
          <footer className="bg-[#f5f8fd] text-white py-12 cursor-pointer">
                  <div className="max-w-7xl mx-auto px-4">
                    <div className="md:flex md:justify-between">
                      <div className="mb-8 md:mb-0">
                        <h3 className="text-3xl font-normal mb-4 text-[#413e66] tracking-custom uppercase">
                          <img
                              src="/assets/brand/asistensia_logo.webp"
                              alt="Asistensia"
                              className="w-30 h-30"
                          />
                        </h3>
                        <p className="text-[#535074] max-w-xs">
                          Expert software consulting services for Ruby, PHP, and DevOps
                          solutions.
                        </p>
                        <p className="text-[#535074] leading-relaxed pt-5 font-medium">
                          Extend your tech team by letting us step in and take charge of
                          <br />
                          everyday tasks. We have an expert team of Full-Stack
                          <br /> Engineers with 24/7 Cloud Support.
                        </p>

                        <h4 className="font-bold text-[#413e66] uppercase pt-8">
                          Our Newsletter
                        </h4>
                        <p className="text-[#535074] leading-relaxed pt-5 font-medium">
                          Would you like to receive emails from Asistensia with updates,
                          <br />
                          tech news and special offers of Asistensia? You can
                          unsubscribe
                          <br /> any time by clicking the unsubscribe link in the email.
                        </p>
                        <input
                          className="mt-10 p-1 w-36 border-1 border-gray-200 focus:outline-none focus:ring-primary focus:border-primary shadow-sm"
                          type="text"
                        />
                        <input
                          className="text-white bg-[#1bb1dc] px-4 py-1 hover:bg-[#1993bc]"
                          type="submit"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#413e66]">
                            Services
                          </h4>
                          <ul className="space-y-2">
                            <li>
                              <Link href="/blog/ruby-on-rails-consulting" className="text-[#535074] hover:text-[#1bb1dc]">
                                Ruby on Rails
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/blog/php-laravel-consulting" className="text-[#535074] hover:text-[#1bb1dc]">
                                PHP & Laravel
                              </Link>
                            </li>
                            <li>
                              <Link href="/blog/devops-consulting" className="text-[#535074] hover:text-[#1bb1dc]">
                                DevOps
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#413e66]">
                            Company
                          </h4>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/#about"
                                className="text-[#535074] hover:text-[#1bb1dc]"
                              >
                                About
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/blog"
                                className="text-[#535074] hover:text-[#1bb1dc]"
                              >
                                Blog
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#contact"
                                className="text-[#535074] hover:text-[#1bb1dc]"
                              >
                                Contact
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#413e66]">
                            Legal
                          </h4>
                          <ul className="space-y-2">
                            <li>
                              <Link
                                href="/privacy"
                                className="text-[#535074] hover:text-[#1bb1dc]"
                              >
                                Privacy
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/#services"
                                className="text-[#535074] hover:text-[#1bb1dc]"
                              >
                                Terms
                              </Link>
                            </li>
                          </ul>
                        </div>
                        {/* Social media links  */}

                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#413e66]">
                            Socials
                          </h4>
                          <div className="flex space-x-8">
                            <a
                              href="https://x.com/i/flow/login?redirect_after_login=%2FTheAsistensia"
                              aria-label="Twitter"
                            >
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className="text-[#1bb1dc] h-6 hover:text-[#1993bc]"
                              />
                            </a>
                            <a
                              href="https://www.facebook.com/asistensiacom/"
                              aria-label="Facebook"
                            >
                              <FontAwesomeIcon
                                icon={faFacebookF}
                                className="text-[#1bb1dc] h-6 hover:text-[#1993bc]"
                              />
                            </a>
                            <a
                              href="https://www.linkedin.com/company/asistensia/"
                              aria-label="LinkedIn"
                            >
                              <FontAwesomeIcon
                                icon={faLinkedin}
                                className="text-[#1bb1dc] h-6 hover:text-[#1993bc]"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-800 text-center text-[#413e66] text-sm">
                      &copy; 2025 Asistensia. All rights reserved.
                    </div>
                  </div>
                </footer>
    </>
  );
}

