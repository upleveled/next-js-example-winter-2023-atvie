import { z } from 'zod';

const returnToSchema = z.string().refine((value) => {
  return !value.startsWith('/logout') && /^\/[\d#/=?a-z-]+$/.test(value);
});

export function getSafeReturnToPath(path: string | string[] | undefined) {
  const result = returnToSchema.safeParse(path);
  if (!result.success) return undefined;
  return result.data;
}
