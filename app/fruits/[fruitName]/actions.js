'use server';
import { cookies } from 'next/headers';
import { getCookieByName } from '../../../util/cookies';

export async function createComment(fruitId, comment) {
  const fruitComments = getCookieByName('fruitComments');

  const currentComments = Array.isArray(fruitComments)
    ? fruitComments.filter((fruitComment) => fruitComment.id !== fruitId)
    : [];

  await cookies()
    .set(
      'fruitComments',
      JSON.stringify([
        ...currentComments,
        {
          id: fruitId,
          comment,
        },
      ]),
    )
    .sort((commentA, commentB) => commentA.id - commentB.id);
}
