import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';
import styles from './LogoutButton.module.scss';

export default function LogoutButtonClient() {
  return (
    <form>
      <button
        className={styles.logoutButton}
        // TODO: remove ts-ignore as soon Next.js implement the type update
        formAction={async () => {
          // By adding use server we define this function as a server function that can be triggered from the client
          // - https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#server-functions
          'use server';
          const cookieStore = cookies();
          const token = cookieStore.get('sessionToken');

          if (token) {
            await deleteSessionByToken(token.value);
          }

          // use the method to delete cookies only available in server actions and Route Handlers.
          // - https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
          // TODO: remove casting as soon Next.js implement the type update:
          // - https://github.com/vercel/next.js/issues/49259#issuecomment-1540019323
          await (cookies() as unknown as ResponseCookies).set(
            'sessionToken',
            '',
            {
              maxAge: -1,
              expires: new Date(Date.now() - 10000),
            },
          );
        }}
      >
        logout
      </button>
    </form>
  );
}
