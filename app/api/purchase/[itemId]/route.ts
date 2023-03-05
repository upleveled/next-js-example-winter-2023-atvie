import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserBySessionToken, User } from '../../../../database/users';

export type PurchaseResponseBodyPost =
  | {
      error: string;
    }
  | {
      user: User;
    };

export async function POST(): Promise<NextResponse<PurchaseResponseBodyPost>> {
  // This is a protected Route Handler that is insecure and vulnerable to CSRF attacks

  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'user not found' });
  }
  // 4. return the user profile
  console.log(
    `Insert a purchase from a very expensive item in database for the user ${user.username} `,
  );
  console.log(`you are hacked!!! this is very insecure `);

  return NextResponse.json({ user: user });
}
