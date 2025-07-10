import Image from "next/image";
import React from "react";
import Head from "next/head";
import ContactSection from "./components/ContactSection";
import ServicestSection from "./components/ServicestSection";

export default function Home() {
    return (
        <>
            <Head>
                <title>Asistensia - Ruby, PHP & DevOps Consulting</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <main className="">
                {/* Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <a href="/" className="text-xl font-bold text-primary">
                                    Asistensia
                                </a>
                            </div>
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#services" className="text-gray-700 hover:text-primary">
                                    Services
                                </a>
                                <a href="#about" className="text-gray-700 hover:text-primary">
                                    About
                                </a>
                                <a href="#contact" className="text-gray-700 hover:text-primary">
                                    Contact
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
                                Unlock your business potential with specialized consulting in Ruby, Rails On Rails
                                PHP, and DevOps solutions.
                            </p>
                            <div className="mt-10">
                                <a href="#contact"  className="mt-10 inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <ServicestSection/>

                {/* About */}
                <section id="about" className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 lg:flex items-center">
                        <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About Asistensia</h2>
                            <p className="text-gray-600 mb-6">
                                We are a team of passionate software consultants specializing in Ruby
                                on Rails, PHP, Laravel, and DevOps technologies.
                            </p>
                            <p className="text-gray-600 mb-6">
                                Our approach combines technical excellence with deep understanding of
                                business needs.
                            </p>
                            <div className="flex space-x-4">
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 className="font-semibold text-primary">50+</h4>
                                    <p className="text-gray-600 text-sm">Projects Completed</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg shadow-sm">
                                    <h4 className="font-semibold text-primary">10+</h4>
                                    <p className="text-gray-600 text-sm">Years Experience</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <img
                                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800"
                                alt="Team working"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <ContactSection/>

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
                                            <a href="#about" className="text-gray-400 hover:text-white">
                                                About
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-gray-400 hover:text-white">
                                                Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#contact" className="text-gray-400 hover:text-white">
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
            </main>
        </>
    );
}
