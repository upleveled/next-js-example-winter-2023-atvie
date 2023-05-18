import Link from 'next/link';
import { fruits } from '../../database/fruits';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';

export const metadata = {
  title: 'Fruits',
  description: 'This is my Fruits Page',
};

export default function FruitsPage() {
  // get the cookie from the server
  const fruitComments = parseJson(getCookie('fruitComments'));

  const currentComments = Array.isArray(fruitComments) ? fruitComments : [];

  const fruitsWithComments = fruits.map((fruit) => {
    const fruitWithComment = { ...fruit };

    // read the cookie and find the fruitNote
    const fruitInCookie = currentComments.find(
      (fruitObject) => fruit.id === fruitObject.id,
    );

    // if find the fruit update the note
    if (fruitInCookie) {
      fruitWithComment.comment = fruitInCookie.comment;
    }

    return fruitWithComment;
  });

  return (
    <div>
      {fruitsWithComments.map((fruit) => {
        return (
          <div
            key={`fruit-${fruit.id}`}
            data-test-id={`fruit-type-${fruit.name.toLocaleLowerCase()}`}
          >
            <Link href={`/fruits/${fruit.name.toLocaleLowerCase()}`}>
              <h2>{fruit.name}</h2>
              <div>{fruit.icon}</div>
              <div>{fruit.comment || 'n/a'}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
