'use server';
import { cookies } from 'next/headers';
import { getFruitByName } from '../database/fruits';
import { getCookieByName } from './cookies';

export async function setFruitNote(formData) {
  console.log(formData.get('fruit-name'));
  const singleFruit = getFruitByName(formData.get('fruit-name'));
  console.log(singleFruit);

  if (!singleFruit) return;

  const userFruitNotes = getCookieByName('fruitNotes');

  const oldNotes = Array.isArray(userFruitNotes)
    ? userFruitNotes.filter((fruitNote) => fruitNote.id !== singleFruit.id)
    : [];

  await cookies().set(
    'fruitNotes',
    JSON.stringify([
      ...oldNotes,
      {
        id: singleFruit.id,
        note: formData.get('fruit-note'),
      },
    ]),
  );
}
