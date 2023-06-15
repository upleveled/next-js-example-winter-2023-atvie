'use server';
import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';

export async function logout() {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  if (token) {
    await deleteSessionByToken(token.value);
  }

  // use the method to delete cookies only available in server actions and Route Handlers.
  // - https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
  await cookies().set('sessionToken', '', {
    maxAge: -1,
  });
}
