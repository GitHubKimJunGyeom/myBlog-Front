// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ko', 'ja'];
const defaultLocale = 'ko';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 리소스 파일 예외 처리
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  // 2. 루트 경로(/) 및 로케일 경로(/ko, /ja)에 대한 리다이렉션
  // 이전에 논의했던 내용입니다. 이 부분이 있다면 로케일 재작성 로직보다 먼저 실행됩니다.
  // if (pathname === '/') {
  //   // '/ja/database/programming_insight_list'로 리다이렉트
  //   return NextResponse.redirect(new URL('/ja/database/programming_insight_list', request.url));
  // }
  // // 다른 리다이렉션 규칙들...
  // if (pathname === '/ko') {
  //   return NextResponse.redirect(new URL('/ko/database/programming_insight_list', request.url));
  // }
  // if (pathname === '/ja') {
  //   return NextResponse.redirect(new URL('/ja/database/programming_insight_list', request.url));
  // }

  // 3. 로케일이 없는 경로에 대한 재작성
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    console.log('Rewriting path to default locale:', `/${defaultLocale}${pathname}`);
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // 4. 모든 조건에 해당하지 않을 경우 다음 단계로
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};