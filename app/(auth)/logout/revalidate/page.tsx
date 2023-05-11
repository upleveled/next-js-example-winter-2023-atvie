'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LogoutButtonClient() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/`);
    router.refresh();
  });
  return null;
}
