import { notFound } from 'next/navigation';
import { getUserByUsername } from '../../../database/users';

export const metadata = {
  description: 'This is my Home Page',
};

type Props = {
  params: {
    username: string;
  };
};

export default async function HomePage({ params }: Props) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <>
      <h1>User: {user.username}</h1>
      <div>id: {user.id}</div>
    </>
  );
}
