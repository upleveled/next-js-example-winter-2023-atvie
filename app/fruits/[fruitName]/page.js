import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { fruits } from '../../../database/fruits';
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
  const singleFruit = fruits.find((fruit) => {
    return fruit.name.toLowerCase() === params.fruitName;
  });

  const cookieStore = cookies();
  const appreciation = cookieStore.get('fruitLove');

  if (!singleFruit) {
    notFound();
  }

  const singleFruitAppreciation =
    appreciation?.value &&
    JSON.parse(appreciation.value).find(
      (appreciationValue) => appreciationValue.id === singleFruit.id,
    );

  return (
    <>
      {/* <Fruit fruit={singleFruit} /> */}
      {singleFruitAppreciation
        ? singleFruitAppreciation.appreciation
        : 'Not rated'}

      <form>
        <input hidden={true} value={params.fruitName} name="fruit-name" />
        <button
          formAction={async (formData) => {
            'use server';

            const fruitFound = fruits.find((fruit) => {
              return fruit.name.toLowerCase() === formData.get('fruit-name');
            });

            const love = cookies().get('fruitLove')?.value;

            const parsedLove = love && JSON.parse(love);

            const singleFruitLove =
              Array.isArray(parsedLove) &&
              parsedLove.find(
                (appreciationValue) => appreciationValue.id === fruitFound?.id,
              );

            await cookies().set(
              'fruitLove',
              JSON.stringify(
                !parsedLove && !singleFruitLove
                  ? [
                      {
                        id: fruitFound.id,
                        appreciation: 'like',
                      },
                    ]
                  : [
                      ...parsedLove.filter(
                        (appreciationValue) =>
                          appreciationValue.id !== fruitFound?.id,
                      ),
                      {
                        id: fruitFound.id,
                        appreciation:
                          singleFruitLove?.appreciation !== 'like'
                            ? 'like'
                            : 'dislike',
                      },
                    ],
              ),
            );
          }}
        >
          {singleFruitAppreciation?.appreciation !== 'like'
            ? 'like'
            : 'dislike'}
        </button>
      </form>
    </>
  );
}
