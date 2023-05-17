import { notFound } from 'next/navigation';
import { fruits, getFruitByName } from '../../../database/fruits';
import { setFruitNote } from '../../../util/actions';
import { getCookieByName } from '../../../util/cookies';
import { rootNotFoundMetadata } from '../../not-found';

// import Fruit from './Fruit';

// export const fruits = [
//   { id: 1, name: 'Banana', icon: '🍌' },
//   { id: 2, name: 'Coconuts', icon: '🥥' },
//   { id: 3, name: 'Papaya', icon: '🥔' },
//   { id: 4, name: 'Mango', icon: '🥭' },
//   { id: 5, name: 'Avocado', icon: '🥑' },
// ];

export function generateMetadata({ params }) {
  const singleFruit = fruits.find((fruit) => {
    return fruit.name.toLowerCase() === params.fruitName;
  });

  if (!singleFruit) {
    return rootNotFoundMetadata;
  }

  return {
    title: singleFruit.name,
    description: `Single fruit page for ${singleFruit.name}`,
  };
}

// we add this only if we have no dynamic function as cookies or headers
export const dynamic = 'force-dynamic';

export default function FruitPage({ params }) {
  const singleFruit = getFruitByName(params.fruitName);

  if (!singleFruit) {
    notFound();
  }

  const appreciation = getCookieByName('fruitLove');

  const singleFruitAppreciation =
    Array.isArray(appreciation) &&
    appreciation.find(
      (appreciationValue) => appreciationValue.id === singleFruit.id,
    );

  return (
    <>
      <h1>{params.fruitName}</h1>
      <p
        style={{
          whiteSpace: 'pre-line',
        }}
      >
        {singleFruitAppreciation?.appreciation ||
          `Please type something about the ${params.fruitName}`}
      </p>

      <form>
        <input
          readOnly
          hidden={true}
          value={params.fruitName}
          name="fruit-name"
        />
        <textarea
          name="fruit-appreciation"
          defaultValue={singleFruitAppreciation?.appreciation}
        />
        <button formAction={setFruitNote}>Update Opinion</button>
      </form>
    </>
  );
}
