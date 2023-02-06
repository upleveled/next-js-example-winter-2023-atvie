import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalById } from '../../../database/animals';
import { animalNotFoundMetadata } from './not-found';

export const dynamic = 'force-dynamic';

export async function generateMetadata(props) {
  const singleAnimal = await getAnimalById(props.params.animalId);

  if (!singleAnimal) {
    return animalNotFoundMetadata;
  }

  return {
    title: `${singleAnimal.firstName} | AnimalsRUs`,
    description: `Single animal page for ${singleAnimal.firstName}`,
    icons: {
      shortcut: '/favicon.ico',
    },
  };
}

export default async function AnimalPage(props) {
  const singleAnimal = await getAnimalById(props.params.animalId);

  if (!singleAnimal) {
    // throw new Error('this action is not allowed with Error id: 213123123');
    notFound();
  }

  return (
    <>
      <h1>{singleAnimal.firstName}</h1>
      <main>
        This animal is a {singleAnimal.type} carrying a {singleAnimal.accessory}
        <br />
        <Image
          src={`/images/${singleAnimal.firstName}-${singleAnimal.id}.jpg`}
          alt={singleAnimal.type}
          width="200"
          height="200"
        />
      </main>
    </>
  );
}
