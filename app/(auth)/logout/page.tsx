import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { deleteSessionByToken } from '../../../database/sessions';

// 1. send a cookie deletion task for the browser
// use a middleware for that
export default async function LogoutPage() {
  // 2. get the session token

  const sessionToken = headers().get('x-sessionToken-to-delete');
  // 3. delete the session that matches that token

  if (sessionToken) {
    await deleteSessionByToken(sessionToken);
  }

  return redirect('/');
}
