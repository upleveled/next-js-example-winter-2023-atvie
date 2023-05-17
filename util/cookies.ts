import cookie from 'cookie';
import { cookies } from 'next/headers';

export type CookieValue = {
  id: number;
  comment: string;
}[];

// more robust way to get items from cookies without parsing all the time
export function getCookie(name: string): string {
  return cookies().get(name)?.value || '[]';
}

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // in the deployed version we want our cookie to be sent only under HTTPS
  // in the development version we want out cookie to be sent under HTTP
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 24 hours in seconds

  return cookie.serialize('sessionToken', token, {
    // new browser
    maxAge: maxAge,
    // for internet explorer and old browsers
    expires: new Date(
      Date.now() + maxAge * 1000, // 24 hours in milliseconds
    ),

    httpOnly: true,
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax', // this prevents CSRF attacks
  });
}
