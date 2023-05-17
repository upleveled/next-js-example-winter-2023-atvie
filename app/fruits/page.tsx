import Link from 'next/link';
import { fruits } from '../../database/fruits';
import { getCookieByName } from '../../util/cookies';

// import ForceRevalidation from '../ForceRevalidation';

export const metadata = {
  title: 'Fruits',
  description: 'This is my Fruits Page',
};

// we add this only if we have no dynamic function as cookies or headers
export const dynamic = 'force-dynamic';
export const revalidate = false;

export default function FruitsPage() {
  // get the cookie from the server
  const userFruitCookie = getCookieByName('fruitNotes');
  const fruitNotes = Array.isArray(userFruitCookie) ? userFruitCookie : [];

  const fruitsWithNotes = fruits.map((fruit) => {
    const fruitWithNote = { ...fruit, note: '' };

    // Read the cookie and find the fruitNote
    const fruitInCookie = fruitNotes.find(
      (fruitObject) => fruit.id === fruitObject.id,
    );

    // if find the fruit update the note
    if (fruitInCookie) {
      fruitWithNote.note = fruitInCookie.note;
    }

    return fruitWithNote;
  });

  return (
    <div>
      {fruitsWithNotes.map((fruit) => {
        return (
          <div
            key={`fruit-${fruit.id}`}
            data-test-id={`fruit-type-${fruit.name.toLocaleLowerCase()}`}
          >
            <Link href={`/fruits/${fruit.name.toLocaleLowerCase()}`}>
              <h2>{fruit.name}</h2>
              <p>{fruit.icon}</p>
              <p>{fruit.note || 'n/a'}</p>
            </Link>
          </div>
        );
      })}
      {/* <ForceRevalidation /> */}
    </div>
  );
}
