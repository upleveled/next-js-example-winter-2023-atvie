import { cookies } from 'next/headers';
import Link from 'next/link';
import { fruits } from '../../database/fruits';
import { CookieValue } from '../../utils/cookies';

export const metadata = {
  title: 'Fruits',
  description: 'This is my Fruits Page',
};

export default function FruitsPage() {
  // get the cookie from the server
  const fruitsCookie = cookies().get('fruitsCookie');

  // create a default value if cooke doesn't exist
  let fruitsCookieParsed: CookieValue = [];

  if (fruitsCookie) {
    fruitsCookieParsed = JSON.parse(fruitsCookie.value);
  }

  const fruitsWithStars = fruits.map((fruit) => {
    const fruitWithStars = { ...fruit, stars: 0 };

    // i read the cookie and find the fruit
    const fruitInCookie = fruitsCookieParsed.find(
      (fruitObject) => fruit.id === fruitObject.id,
    );

    // if find the fruit i update the amount of stars
    if (fruitInCookie) {
      fruitWithStars.stars = fruitInCookie.stars;
    }

    return fruitWithStars;
  });

  return (
    <div>
      {fruitsWithStars.map((fruit) => {
        return (
          <div
            key={`fruit-${fruit.id}`}
            data-test-id={`fruit-type-${fruit.name.toLocaleLowerCase()}`}
          >
            <Link href={`/fruits/${fruit.name.toLocaleLowerCase()}`}>
              <h2>{fruit.name}</h2>
              <p>{fruit.icon}</p>
              <p>stars: {fruit.stars}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
