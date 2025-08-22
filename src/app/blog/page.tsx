import React from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import Link from "next/link";
export default function BlogPage() {
  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold mb-8 text-[#413e66] ">Welcome to Asistensia Blog.</h1>
        <p className="text-lg text-gray-600 mb-4">
          Stay ahead with expert articles, case studies, and updates on Ruby,
          PHP, DevOps, and the software development world.
        </p>
        <div className="bg-white rounded-lg pt-5 flex flex-col md:flex-row items-start gap-4 cursor-pointer">
          <div className="w-full">
            <img
              src= "/assets/React.jpeg"
              className="rounded-lg w-full h-full object-cover max-h-60 md:max-h-full transition-transform duration-300 hover:scale-105"
              alt="react"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 md:ml-10 pt-12 cursor-pointer">
            <Link href="/blog/react-vs-react-native">
              <h3 className="text-3xl font-semibold text-gray-600 hover:text-primary">
                React vs React Native: Lessons From Working on Web and Mobile
                Versions of the Same Product.
              </h3>
            </Link>
            <div className="flex items-center space-x-3">
              <img
                src="https://avatars.githubusercontent.com/u/92224334?s=400&u=e1d4952ea0a183f27be0a918643bfcdcb85cc6ab&v=4"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-medium">Humnashin Khan</p>
                <p className="text-sm text-gray-500">July 25, 2025</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-gray-800 font-medium text-2xl pt-20">
            All topics
          </h3>
        </div>
        <br />
        <hr />
        {/* second Topic */}
        <div className="bg-white rounded-lg pt-20 flex flex-col md:flex-row items-start cursor-pointer">
          <div className="w-full md:w-1/2">
            <img
              src= "/assets/Ruby.jpeg"
              className="rounded-lg object-cover max-h-60 md:max-h-90 transition-transform duration-300 hover:scale-105"
              alt="Blog"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 pt-12 cursor-pointer">
            <Link href="/blog/why-ruby-on-rails-is-best-for-startups">
              <h3 className="text-3xl font-semibold text-gray-600 hover:text-primary">
                Why is Ruby on Rails the great choice for startups in 2025?
              </h3>
            </Link>
            <div className="flex items-center space-x-3">
              <img
                src="/assets/ahmad.png"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-medium">Ahmad Hassan</p>
                <p className="text-sm text-gray-500">June 30, 2025</p>
              </div>
            </div>
          </div>
        </div>
        {/* Third Topic */}

        <div className="bg-white rounded-lg pt-20 flex flex-col md:flex-row items-start cursor-pointer">
          <div className="w-full md:w-1/2">
            <img
              src="/assets/API.jpeg"
              className="rounded-lg object-cover max-h-60 md:max-h-90 transition-transform duration-300 hover:scale-105"
              alt="Blog"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 pt-12 cursor-pointer">
            <Link href="/blog/fastapi-best-python-framework-for-apis">
              <h3 className="text-3xl font-semibold text-gray-600 hover:text-primary">
                Why FastAPI Is Becoming the Go-To Framework for Modern APIs?
              </h3>
            </Link>
            <div className="flex items-center space-x-3">
              <img
                src="/assets/ahmad.png"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-medium">Ahmad Hasan</p>
                <p className="text-sm text-gray-500">July 31, 2025</p>
              </div>
            </div>
          </div>
        </div>
         {/* Fourth Topic */}

         <div className="bg-white rounded-lg pt-20 flex flex-col md:flex-row items-start cursor-pointer">
          <div className="w-full md:w-1/2">
            <img
              src= "/assets/next.png"
              className="rounded-lg object-cover max-h-60 md:max-h-90 transition-transform duration-300 hover:scale-105"
              alt="Blog"
            />
          </div>
          <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 pt-12 cursor-pointer">
            <Link href="/blog/react-vs-next">
              <h3 className="text-3xl font-semibold text-gray-600 hover:text-primary">
                From React to Next.js: The Evolution of Modern Web Development.
              </h3>
            </Link>
            <div className="flex items-center space-x-3">
              <img
                src="https://avatars.githubusercontent.com/u/92224334?s=400&u=e1d4952ea0a183f27be0a918643bfcdcb85cc6ab&v=4"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-medium">Humnashin Khan</p>
                <p className="text-sm text-gray-500">August 06, 2025</p>
              </div>
            </div>
          </div>

           <div className="md:w-1/2 w-full flex flex-col justify-between space-y-4 pt-12 cursor-pointer">
             <Link href="/blog/ruby-on-rails-consulting">
               <h3 className="text-3xl font-semibold text-gray-600 hover:text-primary">
                 Ruby on Rails Consulting in Netherlands: Upgrades, Performance & DevOps
               </h3>
             </Link>
             <div className="flex items-center space-x-3">
               <img
                   src="https://avatars.githubusercontent.com/u/92224334?s=400&u=e1d4952ea0a183f27be0a918643bfcdcb85cc6ab&v=4"
                   alt="Author"
                   className="w-10 h-10 rounded-full"
               />
               <div>
                 <p className="text-gray-800 font-medium">Asistensia Team</p>
                 <p className="text-sm text-gray-500">August 22, 2025</p>
               </div>
             </div>
           </div>
        </div>
      </section>
    </Layout>
  );
}

