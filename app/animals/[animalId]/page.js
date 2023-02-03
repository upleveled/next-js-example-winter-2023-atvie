import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimal } from '../../../database/animals';

// export const animals = [
//   { id: 1, firstName: 'Dodo', type: 'turtle', accessory: 'scope' },
//   { id: 2, firstName: 'Paco', type: 'dog', accessory: 'jacket' },
//   { id: 3, firstName: 'Tira', type: 'cat', accessory: 'glasses' },
//   { id: 4, firstName: 'Danny', type: 'guineapig', accessory: 'zylinder' },
//   { id: 5, firstName: 'Karl', type: 'llama', accessory: 'hat' },
// ];

export const dynamic = 'force-dynamic';

export default async function AnimalPage({ params }) {
  const singleAnimal = await getAnimal(params.animalId);

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
