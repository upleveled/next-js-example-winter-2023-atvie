'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export async function createComment(fruitId, comment) {
  const fruitComments = parseJson(getCookie('fruitComments'));

  if (!fruitComments || !Array.isArray(fruitComments)) return;

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
