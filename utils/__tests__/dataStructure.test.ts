import { getAnimalWithFoods } from '../dataStructure';

test('reduces animal favorite food', () => {
  const animalWithFoods = [
    {
      animalId: 3,
      animalFirstName: 'Tira',
      animalType: 'cat',
      animalAccessory: 'glasses',
      foodId: 2,
      foodName: 'Tomato',
      foodType: 'Fruit',
    },
    {
      animalId: 3,
      animalFirstName: 'Tira',
      animalType: 'cat',
      animalAccessory: 'glasses',
      foodId: 5,
      foodName: 'Ginger',
      foodType: 'Root',
    },
  ];

  expect(getAnimalWithFoods(animalWithFoods)).toStrictEqual({
    id: 3,
    firstName: 'Tira',
    type: 'cat',
    accessory: 'glasses',
    foods: [
      { id: 2, name: 'Tomato', type: 'Fruit' },
      { id: 5, name: 'Ginger', type: 'Root' },
    ],
  });
});
