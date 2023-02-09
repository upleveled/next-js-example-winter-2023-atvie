import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalById,
  getAnimalByIdWithFoods as getAnimalsByIdWithFoods,
} from '../../../../database/animals';
import { getAnimalWithFoods } from '../../../../utils/dataStructure';
import { animalNotFoundMetadata } from '../../[animalId]/not-found';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props: Props) {
  const singleAnimal = await getAnimalById(parseInt(props.params.animalId));

  if (!singleAnimal) {
    return animalNotFoundMetadata;
  }

  return {
    title: singleAnimal.firstName,
    description: `Single animal page for ${singleAnimal.firstName}`,
  };
}

type Props = {
  params: {
    animalId: string;
  };
};

export default async function AnimalWithFoodsPage(props: Props) {
  const animalsWithFoods = await getAnimalsByIdWithFoods(
    parseInt(props.params.animalId),
  );

  console.log(animalsWithFoods);

  if (!animalsWithFoods[0]) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  const animalWithFoods = getAnimalWithFoods(animalsWithFoods);

  console.log(animalWithFoods);

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
