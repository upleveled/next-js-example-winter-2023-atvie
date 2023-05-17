import { notFound } from 'next/navigation';
import { getFruitByName } from '../../../database/fruits';
import { getCookieByName } from '../../../util/cookies';
import { rootNotFoundMetadata } from '../../not-found';
import FruitCommentForm from './FruitCommentForm';

// export const fruits = [
//   { id: 1, name: 'Banana', icon: '🍌' },
//   { id: 2, name: 'Coconuts', icon: '🥥' },
//   { id: 3, name: 'Papaya', icon: '🥔' },
//   { id: 4, name: 'Mango', icon: '🥭' },
//   { id: 5, name: 'Avocado', icon: '🥑' },
// ];

export function generateMetadata({ params }) {
  const singleFruit = getFruitByName(params.fruitName);

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

  let fruitCommentsCookie = getCookieByName('fruitComments');

  if (!Array.isArray(fruitCommentsCookie)) {
    fruitCommentsCookie = [];
  }

  const singleFruitComment = fruitCommentsCookie.find(
    (fruitComment) => fruitComment.id === singleFruit.id,
  );

  return (
    <>
      <h1>{params.fruitName}</h1>
      <span
        style={{
          whiteSpace: 'pre-line',
        }}
      >
        {singleFruitComment?.comment ||
          `Please type something about the ${params.fruitName}`}
      </span>
      <FruitCommentForm
        fruitComment={singleFruitComment?.comment || ''}
        fruitId={singleFruit.id}
      />
    </>
  );
}
