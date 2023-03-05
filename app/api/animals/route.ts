import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  Animal,
  createAnimal,
  getAnimalsWithLimitAndOffset,
} from '../../../database/animals';
import { getUserBySessionToken } from '../../../database/users';
import { validateTokenAgainstSecret } from '../../../util/csrf';

const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string(),
  csrfToken: z.string(),
});

export type AnimalsResponseBodyGet =
  | {
      error: string;
    }
  | {
      animals: Animal[];
    };

export type AnimalsResponseBodyPost =
  | {
      error: string;
    }
  | {
      animal: Animal;
    };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<AnimalsResponseBodyGet>> {
  // this should be a public api method (unprotected)
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get('limit'));
  const offset = Number(searchParams.get('offset'));

  if (!limit || !offset) {
    return NextResponse.json(
      {
        error: 'Limit and Offset need to be passed as params',
      },
      { status: 400 },
    );
  }

  const animals = await getAnimalsWithLimitAndOffset(limit, offset);

  return NextResponse.json({ animals: animals });
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<AnimalsResponseBodyPost>> {
  // this is a protected Route Handler
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  // 2. validate that session
  // 3. get the user profile matching the session
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({ error: 'session token is not valid' });
  }

  const body = await request.json();

  const result = animalSchema.safeParse(body);

  if (!result.success) {
    // Inside of result.error.issues you are going to have more granular information about what is failing allowing you to create more specific error massages
    // console.log(result.error.issues);

    return NextResponse.json(
      {
        error:
          'Request body is missing one of the needed properties firstName, type and accessory ',
      },
      { status: 400 },
    );
  }

  // validate csrf token to make sure the request happens from my server
  if (!validateTokenAgainstSecret(user.csrfSecret, result.data.csrfToken)) {
    return NextResponse.json(
      {
        error: 'CSRF token is not valid',
      },
      { status: 400 },
    );
  }

  const newAnimal = await createAnimal(
    result.data.firstName,
    result.data.type,
    result.data.accessory,
  );

  if (!newAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not created!',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ animal: newAnimal });
}
