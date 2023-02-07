import Image from 'next/image';
import Link from 'next/link';
import { getAnimals } from '../../../database/animals';

export const metadata = {
  description: 'Get all animals',
};

export default async function AnimalsPage() {
  const animals = await getAnimals();

  return (
    <>
      <h1>Animals</h1>
      <main>
        {animals.map((animal) => {
          return (
            <div key={animal.id}>
              <Link
                href={`/animal-management-naive-dont-copy/read/${animal.id}`}
              >
                <h2>{animal.firstName}</h2>
              </Link>
              <Link
                href={`/animal-management-naive-dont-copy/read/${animal.id}`}
              >
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
