import './global.scss';
import Link from 'next/link';
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

export default function RootLayout({ children }) {
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
            </div>
          </nav>
        </header>
        {children}
        <footer className={styles.footer}>
          copyright animals4everyone 2023
        </footer>
      </body>
    </html>
  );
}
