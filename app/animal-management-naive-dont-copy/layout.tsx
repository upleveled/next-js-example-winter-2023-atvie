import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySessionToken } from '../../database/users';

type Props = {
  children: React.ReactNode;
};

export default async function AnimalManagementNaiveDontCopyLayout(
  props: Props,
) {
  const headersList = headers();
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    // Redirect user to custom x-pathname header from Middleware
    redirect(`/login?returnTo=${headersList.get('x-pathname')}`);
  }

  return <div>{props.children}</div>;
}
