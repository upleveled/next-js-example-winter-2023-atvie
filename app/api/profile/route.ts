import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserBySessionToken, User } from '../../../database/users';

export type ProfileResponseBodyGet =
  | {
      error: string;
    }
  | {
      user: User;
    };

export async function GET(): Promise<NextResponse<ProfileResponseBodyGet>> {
  // this is a protected Route Handler
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

  return NextResponse.json({ user: user });
}
