'use client';

// import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { Fruit } from '../../../database/fruits';
import { getParsedCookie, setStringifiedCookie } from '../../../util/cookies';

// fruitsCookie = [ {id: number, stars: number  },  ]
type Props = {
  fruit: Fruit;
};

export default function SingleFruit(props: Props) {
  const router = useRouter();

  return (
    <div>
      <h2>{props.fruit.name}</h2>
      <p>{props.fruit.icon}</p>
      <button
        onClick={() => {
          // get the cookie
          const fruitsInCookies = getParsedCookie('fruitsCookie');

          if (!fruitsInCookies) {
            // if there is no cookie function stop here
            return;
          }

          // try to find the fruit inside of the cookies
          const foundFruit = fruitsInCookies.find((fruitInCookie) => {
            return fruitInCookie.id === props.fruit.id;
          });

          // my fruit is not inside of the cookie
          if (foundFruit) {
            // update the cookie with the new values
            foundFruit.stars--;
            // if there is a negative value set number to 0
            if (foundFruit.stars < 0) {
              foundFruit.stars = 0;
            }
            // Update the cookie after transformation
            setStringifiedCookie('fruitsCookie', fruitsInCookies);
          }
          router.refresh();
        }}
      >
        - ⭐️
      </button>
      <button
        onClick={() => {
          // get the cookie
          const fruitsInCookies = getParsedCookie('fruitsCookie');

          // if there is no cookie we initialize the value with a 1
          if (!fruitsInCookies) {
            // create the cookie with a new object for the fruit
            setStringifiedCookie('fruitsCookie', [
              { id: props.fruit.id, stars: 1 },
            ]);
            // if there is no cookie function stop here
            return;
          }

          const foundFruit = fruitsInCookies.find((fruitInCookie) => {
            return fruitInCookie.id === props.fruit.id;
          });

          // my fruit is inside of the cookie
          if (foundFruit) {
            // Add a start to the foundFruit
            foundFruit.stars++;
            // my fruit is not inside of the cookie
          } else {
            // Add a the fruit to the array of fruits in cookies
            fruitsInCookies.push({ id: props.fruit.id, stars: 1 });
          }

          // Update the cookie after transformation
          setStringifiedCookie('fruitsCookie', fruitsInCookies);
          router.refresh();
        }}
      >
        + ⭐️
      </button>
    </div>
  );
}
