'use server';

import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';

export async function logout() {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  if (token) {
    await deleteSessionByToken(token.value);
  }

  await cookies().set('sessionToken', '', {
    maxAge: -1,
  });
}
