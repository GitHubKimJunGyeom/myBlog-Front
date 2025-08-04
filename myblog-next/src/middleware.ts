// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ko', 'ja'];
const defaultLocale = 'ko';

export function middleware(request: NextRequest) {
  console.log('Middleware is running!'); 

  const { pathname } = request.nextUrl;

  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // ✅ 이 부분을 추가하여 rewrite 로직이 실행되는지 확인합니다.
  if (!pathnameHasLocale) {
    console.log('Rewriting path to default locale:', `/${defaultLocale}${pathname}`);
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};