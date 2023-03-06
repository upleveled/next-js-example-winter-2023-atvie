import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    !request.nextUrl.pathname.startsWith('/animal-management-naive-dont-copy')
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
