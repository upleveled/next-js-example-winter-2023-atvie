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
  const fruitCommentsCookie = getCookie('fruitComments');

  const fruitComments = !fruitCommentsCookie
    ? []
    : parseJson(fruitCommentsCookie);

  const fruitsWithComments = fruits.map((fruit) => {
    // read the cookie and find the fruitNote
    const matchingFruitFromCookie = fruitComments.find(
      (fruitObject) => fruit.id === fruitObject.id,
    );

    return {
      ...fruit,
      comment: matchingFruitFromCookie.comment,
    };
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
              <div>{fruit.comment || ''}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
