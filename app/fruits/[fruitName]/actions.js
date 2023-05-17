'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export async function createComment(fruitId, comment) {
  const fruitCommentsParsed = parseJson(getCookie('fruitComments'));

  const currentComments = Array.isArray(fruitCommentsParsed)
    ? fruitCommentsParsed.filter((fruitComment) => fruitComment.id !== fruitId)
    : [];

  await cookies().set(
    'fruitComments',
    JSON.stringify(
      [
        ...currentComments,
        {
          id: fruitId,
          comment,
        },
      ].sort((commentA, commentB) => commentA.id - commentB.id),
    ),
  );
}
