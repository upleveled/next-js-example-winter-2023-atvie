import { fruits } from '../../../database/fruits';
import Fruit from './Fruit';

// export const fruits = [
//   { id: 1, name: 'Banana', icon: '🍌' },
//   { id: 2, name: 'Coconuts', icon: '🥥' },
//   { id: 3, name: 'Papaya', icon: '🥔' },
//   { id: 4, name: 'Mango', icon: '🥭' },
//   { id: 5, name: 'Avocado', icon: '🥑' },
// ];

// we add this only if we have no dynamic function as cookies or headers
export const dynamic = 'force-dynamic';

export default function FruitPage({ params }) {
  const singleFruit = fruits.find((fruit) => {
    return fruit.name.toLowerCase() === params.fruitName;
  });

  return <Fruit fruit={singleFruit} />;
}
