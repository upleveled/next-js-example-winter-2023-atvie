import { cache } from 'react';
import { sql } from './connect';

// Now we are getting this data from the database
// export const animals1 = [
//   { id: 1, firstName: 'Dodo', type: 'turtle', accessory: 'scope' },
//   { id: 2, firstName: 'Paco', type: 'dog', accessory: 'jacket' },
//   { id: 3, firstName: 'Tira', type: 'cat', accessory: 'glasses' },
//   { id: 4, firstName: 'Danny', type: 'guineapig', accessory: 'zylinder' },
//   { id: 5, firstName: 'Karl', type: 'llama', accessory: 'hat' },
// ];

type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
};

// get all animals
export const getAnimals = cache(async () => {
  const animals = await sql<Animal[]>`
  SELECT * FROM animals
  `;

  return animals;
});

// get a single animal
export const getAnimal = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE id = ${id}
  `;
  return animal;
});
