'use client';

import { getParsedCookie, setStringifiedCookie } from '../../../utils/cookies';

// fruitsCookie = [ {id: number, stars: number  },  ]

export default function Fruit(props) {
  return (
    <div>
      <h2>{props.fruit.name}</h2>
      <p>{props.fruit.icon}</p>
      <button
        onClick={() => {
          // I get the cookie
          const fruitsInCookies = getParsedCookie('fruitsCookie');

          // if there is no cookie we initialize the value with a 1

          if (!fruitsInCookies) {
            // if there is no cookie function stop here
            return;
          }

          const foundFruit = fruitsInCookies.find((fruitInCookie) => {
            return fruitInCookie.id === props.fruit.id;
          });

          // my fruit is inside of the cookie
          if (foundFruit) {
            foundFruit.stars--;

            if (foundFruit.stars < 0) {
              foundFruit.stars = 0;
            }
            // my fruit is not inside of the cookie
            // update the cookie with the new values
            setStringifiedCookie('fruitsCookie', fruitsInCookies);
          }
        }}
      >
        - ⭐️
      </button>
      <button
        onClick={() => {
          // I get the cookie
          const fruitsInCookies = getParsedCookie('fruitsCookie');

          // if there is no cookie we initialize the value with a 1

          if (!fruitsInCookies) {
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
            foundFruit.stars++;
            // my fruit is not inside of the cookie
          } else {
            fruitsInCookies.push({ id: props.fruit.id, stars: 1 });
          }

          // update the cookie with the new values
          setStringifiedCookie('fruitsCookie', fruitsInCookies);
        }}
      >
        + ⭐️
      </button>
    </div>
  );
}
