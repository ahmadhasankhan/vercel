import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match both internationalized pathnames and the root, 
  // excluding internal Next.js paths and static files.
  matcher: ['/((?!api|_next|assets|.*\\..*).*)']
};
