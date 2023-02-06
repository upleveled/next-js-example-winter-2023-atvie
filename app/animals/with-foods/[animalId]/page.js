import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalById,
  getAnimalByIdWithFoods as getAnimalsByIdWithFoods,
} from '../../../../database/animals';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const singleAnimal = await getAnimalById(props.params.animalId);

  return {
    title: `${singleAnimal.firstName} | AnimalsRUs`,
    description: `Single animal page for ${singleAnimal.firstName}`,
    icons: {
      shortcut: '/favicon.ico',
    },
  };
}

export default async function AnimalWithFoodsPage(props) {
  const animalsWithFoods = await getAnimalsByIdWithFoods(props.params.animalId);

  if (!animalsWithFoods[0]) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  const animalWithFoods = {
    id: animalsWithFoods[0].animalId,
    firstName: animalsWithFoods[0].animalFirstName,
    type: animalsWithFoods[0].animalType,
    accessory: animalsWithFoods[0].animalAccessory,
    foods: animalsWithFoods.map((food) => {
      return {
        id: food.foodId,
        name: food.foodName,
        type: food.foodType,
      };
    }),
  };

  return (
    <>
      <h1>{animalWithFoods.firstName}</h1>
      <main>
        {animalWithFoods.firstName} is a {animalWithFoods.type} carrying a{' '}
        {animalWithFoods.accessory} who likes:
        <ul>
          {animalWithFoods.foods.map((food) => {
            return (
              <li key={`animal-foods-${food.id}`}>
                {food.name} ({food.type})
              </li>
            );
          })}
        </ul>
        <br />
        <Image
          src={`/images/${animalWithFoods.firstName}-${animalWithFoods.id}.jpg`}
          alt={animalWithFoods.type}
          width="200"
          height="200"
        />
      </main>
    </>
  );
}
