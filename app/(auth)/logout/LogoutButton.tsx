'use client';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import setCookie from './logoutAction';
import styles from './LogoutButton.module.scss';

export default function LogoutButtonClient() {
  const [, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      className={styles.logoutButton}
      onClick={() => {
        startTransition(() => {
          setCookie().catch(() => {});
        });
        router.replace('/');
        router.refresh();
      }}
    >
      logout
    </button>
  );
}
