import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/logout',
};

// in middleware request headers are read only
export function middleware(request: NextRequest) {
  // creating a new headers object
  const requestHeaders = new Headers(request.headers);

  const sessionToken = request.cookies.get('sessionToken')?.value;

  if (sessionToken) {
    // this is important because i am going to catch this header in the Server Component
    requestHeaders.set('x-sessionToken-to-delete', sessionToken);
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // delete the cookie from the browser
  response.cookies.set({
    name: 'sessionToken',
    value: '',
    maxAge: -1,
  });

  return response;
}
