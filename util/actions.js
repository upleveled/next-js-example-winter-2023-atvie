'use server';
import { cookies } from 'next/headers';
import { getFruitByName } from '../database/fruits';
import { getCookieByName } from './cookies';

export async function setFruitNote(formData) {
  const singleFruit = getFruitByName(formData.get('fruit-name'));
  const userFruitNotes = getCookieByName('fruitLove');

  const oldNotes = Array.isArray(userFruitNotes)
    ? userFruitNotes.filter((fruitNote) => fruitNote.id !== singleFruit?.id)
    : [];

  await cookies().set(
    'fruitLove',
    JSON.stringify([
      ...oldNotes,
      {
        id: singleFruit.id,
        appreciation: formData.get('fruit-appreciation'),
      },
    ]),
  );
}
