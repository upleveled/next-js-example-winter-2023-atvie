import Image from 'next/image';
import Link from 'next/link';
import { getAnimals } from '../../database/animals';

export const metadata = {
  title: 'Animals',
  description: 'This is my Animals page',
};

export const dynamic = 'force-dynamic';

export default async function AnimalsPage() {
  const animals = await getAnimals();

  // const animals = [
  //   { id: 1, firstName: 'Dodo', type: 'turtle', accessory: 'scope' },
  //   { id: 2, firstName: 'Paco', type: 'dog', accessory: 'jacket' },
  //   { id: 3, firstName: 'Tira', type: 'cat', accessory: 'glasses' },
  //   { id: 4, firstName: 'Danny', type: 'guineapig', accessory: 'zylinder' },
  //   { id: 5, firstName: 'Karl', type: 'llama', accessory: 'hat' },
  // ];

  return (
    <>
      <h1>Animals</h1>
      <main>
        {animals.map((animal) => {
          return (
            <div key={animal.id} data-test-id={`animal-type-${animal.type}`}>
              <Link href={`/animals/${animal.id}`}>
                <h2>{animal.firstName}</h2>
              </Link>
              <Link href={`/animals/${animal.id}`}>
                <Image
                  src={`/images/${animal.firstName}-${animal.id}.jpg`}
                  alt={animal.type}
                  width="200"
                  height="200"
                />
              </Link>
            </div>
          );
        })}
      </main>
    </>
  );
}
