const foods = [
  { id: 1, name: 'Broccoli', type: 'Vegetable' },
  { id: 2, name: 'Tomato', type: 'Fruit' },
  { id: 3, name: 'Potato', type: 'Vegetable' },
  { id: 4, name: 'Hazelnuts', type: 'Nuts' },
  { id: 5, name: 'Ginger', type: 'Root' },
  { id: 6, name: 'Garlic', type: 'Spice' },
];

export async function up(sql) {
  await sql`
    INSERT INTO foods ${sql(foods, 'name', 'type')}
  `;
}

export async function down(sql) {
  for (const food of foods) {
    await sql`
      DELETE FROM
        foods
      WHERE
        id = ${food.id}
    `;
  }
}
