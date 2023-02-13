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
