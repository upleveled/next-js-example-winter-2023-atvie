const animalsFoods = [
  { id: 1, animal_id: 3, food_id: 5 },
  { id: 2, animal_id: 3, food_id: 2 },
  { id: 3, animal_id: 2, food_id: 3 },
  { id: 4, animal_id: 1, food_id: 1 },
];

export async function up(sql) {
  await sql`
    INSERT INTO animals_foods ${sql(animalsFoods, 'animal_id', 'food_id')}
  `;
}

export async function down(sql) {
  for (const animalFood of animalsFoods) {
    await sql`
      DELETE FROM
        animals_foods
      WHERE
        id = ${animalFood.id}
    `;
  }
}
