import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";


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
              <a href="/#about" className="text-gray-700 hover:text-[#1bb1dc]">
                About Us
              </a>
              <a href="/#services" className="text-gray-700 hover:text-[#1bb1dc]">
                Services
              </a>
               <a href="/#services" className="text-gray-700 hover:text-[#1bb1dc]">
                Privacy
              </a>
               <a href="/#services" className="text-gray-700 hover:text-[#1bb1dc]">
                Terms
              </a>
              <a href="/blog" className="text-gray-700 hover:text-[#1bb1dc]">
                Blog
              </a>
              <a href="/#contact" className="text-gray-700 hover:text-[#1bb1dc]">
                Contact
              </a>
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
    </>
  );
}
