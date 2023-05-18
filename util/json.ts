import sjson from 'secure-json-parse';
import { CookieValue } from './cookies';

export function parseJson(string: string): CookieValue[] | undefined {
  try {
    return sjson(string);
  } catch {
    return undefined;
  }
}
