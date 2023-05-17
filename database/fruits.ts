export type Fruit = {
  id: number;
  name: string;
  icon: string;
};

export const fruits: Fruit[] = [
  { id: 1, name: 'Banana', icon: '🍌' },
  { id: 2, name: 'Coconuts', icon: '🥥' },
  { id: 3, name: 'Papaya', icon: '🥔' },
  { id: 4, name: 'Mango', icon: '🥭' },
  { id: 5, name: 'Avocado', icon: '🥑' },
];

export function getFruitByName(name?: string) {
  if (!name) return undefined;

  return fruits.find((fruit) => {
    return fruit.name.toLowerCase() === name;
  });
}
