export async function up(sql) {
  await sql`
    CREATE TABLE animals_foods (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      animal_id integer REFERENCES animals (id) ON DELETE CASCADE,
      food_id integer REFERENCES foods (id)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE animals_foods
  `;
}
