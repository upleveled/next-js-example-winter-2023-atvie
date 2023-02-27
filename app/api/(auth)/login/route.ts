import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserWithPasswordHashByUsername } from '../../../../database/users';

const userType = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginResponseBody =
  | { errors: { message: string }[] }
  | { user: { username: string } };

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const result = userType.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties username and password',
      },
      { status: 400 },
    );
  }

  if (!result.data.username || !result.data.password) {
    return NextResponse.json(
      { errors: [{ message: 'username or password is empty' }] },
      { status: 400 },
    );
  }

  const user = await getUserWithPasswordHashByUsername(result.data.username);

  if (!user) {
    return NextResponse.json(
      { errors: [{ message: 'user not found' }] },
      { status: 401 },
    );
  }
  // 3. check if the hash and the password match
  const isValidPassword = await bcrypt.compare(
    result.data.password,
    user.passwordHash,
  );

  if (!isValidPassword) {
    return NextResponse.json(
      { errors: [{ message: 'password is not valid' }] },
      { status: 401 },
    );
  }

  return NextResponse.json({ user: { username: user.username } });
};
