export async function up(sql) {
  await sql`
    CREATE TABLE animals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      type varchar(30) NOT NULL,
      accessory varchar(40)
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE animals
  `;
}
