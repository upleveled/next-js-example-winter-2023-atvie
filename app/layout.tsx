import './global.scss';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import CookieBanner from './CookieBanner';
import styles from './layout.module.scss';

export const metadata = {
  title: {
    default: 'animals4everyone',
    template: '%s | animals4everyone',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default async function RootLayout(props: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));
  // if i have a user the person is logged in
  // if don't have a user the person is logged out

  const randomNumber = Math.floor(Math.random() * 10);

  return (
    <html lang="en">
      <head />
      <body>
        <CookieBanner />
        <header className={styles.header}>
          <nav>
            <div>
              <Link href="/">Home</Link>
              <Link href="/animals">Animals</Link>
              <Link href="/fruits">Fruits</Link>
              <Link href="/animals/admin">Admin</Link>
              <Link href="/animals/paginated">paginated</Link>
              <div>{randomNumber}</div>
              <div className={styles.auth}>
                {user && user.username}
                {user ? (
                  <Link href="/logout" prefetch={false}>
                    logout
                  </Link>
                ) : (
                  <>
                    <Link href="/register">register</Link>
                    <Link href="/login">login</Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </header>
        {props.children}
        <footer className={styles.footer}>
          copyright animals4everyone 2023
        </footer>
      </body>
    </html>
  );
}
