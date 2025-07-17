import React from "react";
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
              src="https://arhamtechnosoft.com/wp-content/uploads/2024/04/React-BLOG-IMAGES-01-891x505-1.jpg"
              className="rounded-lg w-full h-full object-cover max-h-60 md:max-h-full transition-transform duration-300 hover:scale-105"
              alt="Blog"
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
                <p className="text-sm text-gray-500">July 11, 2025</p>
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
        <div className="bg-white rounded-lg pt-20 flex flex-col md:flex-row items-start gap-4 cursor-pointer">
          <div className="w-full md:w-1/2">
            <img
              src="https://railsfactory.com/static/221d2129b9f4fa775854e8fb5bc464f5/51f0f/Ruby_on_Rails_the_great_choice_for_startups_5e65fa9e98.webp"
              className="rounded-lg object-cover max-h-60 md:max-h-80 transition-transform duration-300 hover:scale-105"
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
                src="https://avatars.githubusercontent.com/u/3341200?v=4"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-medium">Ahmad Hassan</p>
                <p className="text-sm text-gray-500">July 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
        {/* Third Topic */}

        <div className="bg-white rounded-lg pt-20 flex flex-col md:flex-row items-start gap-4 cursor-pointer">
          <div className="w-full md:w-1/2">
            <img
              src="https://railsfactory.com/static/b35e5bde0cf641e1c01b467e1510c3f7/51f0f/Fast_API_23a297480e.webp"
              className="rounded-lg object-cover max-h-60 md:max-h-80 transition-transform duration-300 hover:scale-105"
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
                src="https://www.profilebakery.com/wp-content/uploads/2023/09/good-lighting.jpg-2.jpg"
                alt="Author"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-gray-800 font-medium">Jashwanth</p>
                <p className="text-sm text-gray-500">July 16, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
