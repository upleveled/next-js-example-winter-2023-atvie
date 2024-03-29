'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export async function createOrUpdateComment(fruitId, comment) {
  const fruitCommentsCookie = getCookie('fruitComments');

  const fruitComments = !fruitCommentsCookie
    ? []
    : parseJson(fruitCommentsCookie);

  const fruitToUpdate = fruitComments.find(
    (fruitComment) => fruitComment.id === fruitId,
  );

  if (fruitToUpdate) {
    fruitToUpdate.comment = comment;
  } else {
    fruitComments.push({
      id: fruitId,
      comment,
    });
  }

  await cookies().set('fruitComments', JSON.stringify(fruitComments));
}
