type AnimalsWithFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string;
  foodId: number;
  foodName: string;
  foodType: string;
};

export function getAnimalWithFoods(animalsWithFoods: AnimalsWithFoods[]) {
  const animalWithFoods = {
    id: animalsWithFoods[0]!.animalId,
    firstName: animalsWithFoods[0]!.animalFirstName,
    type: animalsWithFoods[0]!.animalType,
    accessory: animalsWithFoods[0]!.animalAccessory,
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
