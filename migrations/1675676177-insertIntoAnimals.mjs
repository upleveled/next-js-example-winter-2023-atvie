const animals = [
  { id: 1, first_name: 'Dodo', type: 'turtle', accessory: 'scope' },
  { id: 2, first_name: 'Paco', type: 'dog', accessory: 'jacket' },
  { id: 3, first_name: 'Tira', type: 'cat', accessory: 'glasses' },
  { id: 4, first_name: 'Danny', type: 'guineapig', accessory: 'zylinder' },
  { id: 5, first_name: 'Karl', type: 'llama', accessory: 'hat' },
];

export async function up(sql) {
  await sql`
    INSERT INTO animals ${sql(animals, 'first_name', 'type', 'accessory')}
  `;
}

export async function down(sql) {
  for (const animal of animals) {
    await sql`
      DELETE FROM
        animals
      WHERE
        id = ${animal.id}
    `;
  }
}
