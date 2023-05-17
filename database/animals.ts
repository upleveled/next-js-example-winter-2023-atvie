import 'server-only';
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

export type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
};

export const preload = (id: number) => {
  void getAnimalById(id);
};

// get all animals
export const getAnimals = cache(async () => {
  const animals = await sql<Animal[]>`
    SELECT * FROM animals
  `;

  return animals;
});

export const getAnimalsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const animals = await sql<Animal[]>`
    SELECT * FROM animals
    Limit ${limit}
    offset ${offset}
  `;

    return animals;
  },
);

// get a single animal
export const getAnimalById = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${id}
  `;
  return animal;
});

// get a single animal only if i have a valid session token
export const getAnimalByIdAndSessionToken = cache(
  async (id: number, token: string) => {
    const [animal] = await sql<Animal[]>`
    SELECT
      animals.*
    FROM
      animals
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      animals.id = ${id}
  `;
    return animal;
  },
);

export type AnimalWithFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  foodId: number;
  foodName: string;
  foodType: string;
};

export const getAnimalByIdWithFoodsAndSessionToken = cache(
  async (id: number, token: string) => {
    const animalsWithFoods = await sql<AnimalWithFoods[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      foods.id AS food_id,
      foods.name AS food_name,
      foods.type AS food_type
    FROM
      animals
    INNER JOIN
      animals_foods ON animals.id = animals_foods.animal_id
    INNER JOIN
      foods ON animals_foods.food_id = foods.id
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      animals.id = ${id}
  `;
    return animalsWithFoods;
  },
);

export const createAnimal = cache(
  async (firstName: string, type: string, accessory: string) => {
    const [animal] = await sql<Animal[]>`
      INSERT INTO animals
        (first_name, type, accessory)
      VALUES
        (${firstName}, ${type}, ${accessory})
      RETURNING *
    `;
    return animal;
  },
);

export const updateAnimalById = cache(
  async (id: number, firstName: string, type: string, accessory: string) => {
    const [animal] = await sql<Animal[]>`
      UPDATE
        animals
      SET
        first_name = ${firstName},
        type = ${type},
        accessory = ${accessory}
      WHERE
        id = ${id}
      RETURNING *
    `;
    return animal;
  },
);

export const deleteAnimalById = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    DELETE FROM
      animals
    WHERE
      id = ${id}
    RETURNING *
  `;
  return animal;
});
