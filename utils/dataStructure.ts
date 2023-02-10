import { AnimalWithFoods } from '../database/animals';

export function getAnimalWithFoods(animalsWithFoods: AnimalWithFoods[]) {
  if (typeof animalsWithFoods[0] === 'undefined') {
    throw new Error('No animal found');
  }

  const animalWithFoods = {
    id: animalsWithFoods[0].animalId,
    firstName: animalsWithFoods[0].animalFirstName,
    type: animalsWithFoods[0].animalType,
    accessory: animalsWithFoods[0].animalAccessory,
    foods: animalsWithFoods.map((food) => {
      return {
        id: food.foodId,
        name: food.foodName,
        type: food.foodType,
      };
    }),
  };
  return animalWithFoods;
}
