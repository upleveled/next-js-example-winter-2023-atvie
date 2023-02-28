export async function up(sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(90) NOT NULL UNIQUE,
      password_hash varchar(70) NOT NULL UNIQUE
    )
  `;
}

export async function down(sql) {
  await sql`
    DROP TABLE users
  `;
}
