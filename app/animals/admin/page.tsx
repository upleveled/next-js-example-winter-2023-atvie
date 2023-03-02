import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAnimals } from '../../../database/animals';
import { getValidSessionByToken } from '../../../database/sessions';
import Dashboard from './Dashboard';

export default async function AnimalAdminPage() {
  // check if i have a valid session
  const sessionTokenCookie = cookies().get('sessionToken');
  console.log(sessionTokenCookie);

  const session =
    sessionTokenCookie &&
    (await getValidSessionByToken(sessionTokenCookie.value));

  // if yes redirect to home

  // for example you may also check if session user is an admin role

  if (!session) {
    redirect('/login?returnTo=/animals/admin');
  }

  const animals = await getAnimals();

  return <Dashboard animals={animals} />;
}
