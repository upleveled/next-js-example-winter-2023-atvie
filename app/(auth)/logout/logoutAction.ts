'use server';
import { cookies } from 'next/headers';
import { deleteSessionByToken } from '../../../database/sessions';


export default async function setCookie() {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  if (token) {
    await deleteSessionByToken(token.value);
  }

  (cookieStore as any).set('sessionToken', '', {
    maxAge: -1,
    expires: new Date(Date.now() - 10000),
  });
}
