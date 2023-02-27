import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  username: string;
  passwordHash: string;
};

export const createUser = cache(
  async (username: string, password_hash: string) => {
    const [userWithoutPassword] = await sql<{ id: number; username: string }[]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${password_hash})
    RETURNING
      id,
      username
  `;

    return userWithoutPassword!;
  },
);

export const getUserByUsername = cache(async (username: string) => {
  if (!username) return undefined;

  const [user] = await sql<{ id: number; username: string }[]>`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      users.username = ${username}
  `;

  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    if (!username) return undefined;

    const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      users.username = ${username}
  `;

    return user;
  },
);
