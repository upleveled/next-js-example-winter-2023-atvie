import cookie from 'cookie';
import Cookies from 'js-cookie';

// more robust way to get items from cookies without parsing all the time
export function getParsedCookie(key: string): CookieValue | undefined {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type should be a string
  } catch (err) {
    return undefined;
  }
}

export type CookieValue = {
  id: number;
  stars: number;
}[];

// more robust way to set items to set the cookie without stringify all the time
export function setStringifiedCookie(key: string, value: CookieValue) {
  Cookies.set(key, JSON.stringify(value));
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value: CookieValue) {
  return JSON.stringify(value);
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
