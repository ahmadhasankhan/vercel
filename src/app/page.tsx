import Image from "next/image";
import React from "react";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import ContactSection from "./components/ContactSection";
import ServicestSection from "./components/ServicestSection";
import AskQuestion from "./components/AskQuestion";
import Team from "./components/Team";

export default function Home() {
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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="text-xl font-bold text-primary">
                  Asistensia
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-gray-700 hover:text-[#1bb1dc]">
                  About us
                </a>
                <a
                  href="#services"
                  className="text-gray-700 hover:text-[#1bb1dc]"
                >
                  Services
                </a>
                <a href="#about" className="text-gray-700 hover:text-[#1bb1dc]">
                  Privacy
                </a>
                <a href="#about" className="text-gray-700 hover:text-[#1bb1dc]">
                  Terms
                </a>
                <a href="/blog" className="text-gray-700 hover:text-[#1bb1dc]">
                  Blog
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-[#1bb1dc]"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Expert Software Consulting Services
              </h1>

              <p className="text-xl md:text-2xl max-w-4xl mx-auto">
                Unlock your business potential with specialized consulting in
                Ruby, Rails On Rails PHP, and DevOps solutions.
              </p>
              <div className="mt-10">
                <a
                  href="#contact"
                  className="mt-10 inline-block bg-white text-[#1bb1dc] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 lg:flex items-center">
            <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About Asistensia
              </h2>
              <h3 className="text-[#696592] font-semibold text-xl italic mb-4">
                The team that lets you build more, while configuring less
              </h3>

              <p className="text-gray-600">
                We are a team of passionate software consultants specializing in
                Ruby on Rails, PHP, Laravel, DevOps, React and React Native
                technologies.
              </p>
              <p className="text-gray-600 mb-2">
                Our approach combines technical excellence with deep
                understanding of business needs.
              </p>

              <h2 className="text-[#444] font-semibold text-[18px] pt-5">
                Asistensia is based on three pillars:
              </h2>
              <ul>
                <li className="text-[#444] font-normal text-[18px] pt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className="text-[#1bb1dc] h-8 p-2"
                  />
                  Streamlined processes.
                </li>
                <li className="text-[#444] font-normal text-[18px] pt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className="text-[#1bb1dc] h-8 p-2"
                  />
                  Proven technologies.
                </li>
                <li className="text-[#444] font-normal text-[18px] pt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faCheckDouble}
                    className="text-[#1bb1dc] p-2 h-8"
                  />
                  Talented people.
                </li>
                <p className="text-[#444] font-normal text-[18px] pt-6">
                  The combination of these things makes us one of the top
                  software development companies.
                </p>
              </ul>

              <div className="flex space-x-4 pt-5">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-[#1bb1dc]">50+</h4>
                  <p className="text-gray-600 text-sm">Projects Completed</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-[#1bb1dc]">10+</h4>
                  <p className="text-gray-600 text-sm">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 mb-20">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800"
                alt="Team working"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <ServicestSection />

        {/* Contact */}
        <ContactSection />

        {/* Team */}
        <Team />

        {/* FAQ */}
        <AskQuestion />

        {/* Footer */}
        <footer className="bg-[#f5f8fd] text-white py-12 cursor-pointer">
          <div className="max-w-7xl mx-auto px-4">
            <div className="md:flex md:justify-between">
              <div className="mb-8 md:mb-0">
                <h3 className="text-3xl font-normal mb-4 text-[#413e66] tracking-custom uppercase">
                  Asistensia
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
                      <a
                        href="#"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        Ruby on Rails
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        PHP & Laravel
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        DevOps
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#413e66]">
                    Company
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#about"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="/blog"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        Blog
                      </a>
                    </li>
                    <li>
                      <a
                        href="#contact"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#413e66]">
                    Legal
                  </h4>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-[#535074] hover:text-[#1bb1dc]"
                      >
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Social media links  */}
                <div>
                  <h4 className="text-sm font-semibold uppercase tracking-wider m-4 text-[#413e66] cursor-pointer">
                    Links
                  </h4>
                  <a href="https://x.com/i/flow/login?redirect_after_login=%2FTheAsistensia">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      className="text-[#1bb1dc] h-6 px-3 m-5 rounded-full hover:text-[#1993bc]"
                    />
                  </a>
                  <a href="https://www.facebook.com/asistencia.in/">
                    <FontAwesomeIcon
                      icon={faFacebookF}
                      className="text-[#1bb1dc] h-6 px-3 m-5 rounded-full hover:text-[#1993bc]"
                    />
                  </a>
                  <a href="https://www.linkedin.com/company/asistensia/">
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className=" text-[#1bb1dc] h-6 px-3 m-5 rounded-full hover:text-[#1993bc]"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-[#413e66] text-sm">
              &copy; 2025 Asistensia. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
