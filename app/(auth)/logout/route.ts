import cookie from 'cookie';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteSessionByToken } from '../../../database/sessions';

export async function GET(request: NextRequest): Promise<NextResponse<any>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  if (token) {
    await deleteSessionByToken(token.value);
  }

  const path = request.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);
  console.log(request.nextUrl);

  return NextResponse.json(null, {
    status: 307,
    headers: {
      'Set-Cookie': cookie.serialize('sessionToken', '', {
        maxAge: -1,
        expires: new Date(Date.now() - 10000),
      }),
      location: '/',
    },
  });
}
