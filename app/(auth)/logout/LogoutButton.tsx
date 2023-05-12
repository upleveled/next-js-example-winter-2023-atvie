import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';
import styles from './LogoutButton.module.scss';

export default function LogoutButtonClient() {
  return (
    <form>
      <button
        className={styles.logoutButton}
        /* @ts-ignore */
        formAction={async () => {
          'use server';
          const cookieStore = cookies();
          const token = cookieStore.get('sessionToken');

          if (token) {
            await deleteSessionByToken(token.value);
          }

          (cookies() as any).set('sessionToken', '', {
            maxAge: -1,
            expires: new Date(Date.now() - 10000),
          });
        }}
      >
        logout
      </button>
    </form>
  );
}
