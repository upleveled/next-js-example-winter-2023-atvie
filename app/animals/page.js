import Image from 'next/image';
import Link from 'next/link';
import { animals } from '../../database/animals';

export default function AnimalsPage() {
  return (
    <>
      <h1>Animals</h1>
      <main>
        {animals.map((animal) => {
          return (
            <div key={animal.id}>
              <Link href={`/animals/${animal.firstName.toLocaleLowerCase()}`}>
                <h2>{animal.firstName}</h2>
              </Link>
              <Link href={`/animals/${animal.firstName.toLocaleLowerCase()}`}>
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
