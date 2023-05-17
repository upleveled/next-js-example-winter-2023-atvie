import { cache } from 'react';
import { sql } from './connect';

type Session = {
  id: number;
  token: string;
  csrfSecret: string;
};

export const createSession = cache(
  async (token: string, userId: number, csrfSecret: string) => {
    const [session] = await sql<{ id: number; token: string }[]>`
      INSERT INTO sessions
        (token, user_id, csrf_secret)
      VALUES
        (${token}, ${userId}, ${csrfSecret})
      RETURNING
        id,
        token
    `;

    await deleteExpiredSessions();

    return session;
  },
);

export const deleteExpiredSessions = cache(async () => {
  await sql`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < now()
  `;
});

export const deleteSessionByToken = cache(async (token: string) => {
  const [session] = await sql<{ id: number; token: string }[]>`
    DELETE FROM
      sessions
    WHERE
      sessions.token = ${token}
    RETURNING
      id,
      token
  `;

  return session;
});

export const getValidSessionByToken = cache(async (token: string) => {
  const [session] = await sql<Session[]>`
    SELECT
      sessions.id,
      sessions.token,
      sessions.csrf_secret
     FROM
      sessions
    WHERE
      sessions.token = ${token}
    AND
      sessions.expiry_timestamp > now()
  `;

  return session;
});
