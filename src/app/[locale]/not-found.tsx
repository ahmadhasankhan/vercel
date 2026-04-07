import {Link} from '@/i18n/routing';
import Layout from './components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-6xl font-bold text-[#1bb1dc] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="flex space-x-4">
          <Link
            href="/"
            className="bg-[#1bb1dc] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1993bc] transition duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/blog"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition duration-300"
          >
            Read Blog
          </Link>
        </div>
      </div>
    </Layout>
  );
}
