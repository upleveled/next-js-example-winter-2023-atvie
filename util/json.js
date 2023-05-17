import sjson from 'secure-json-parse';

export function parseJson(string) {
  try {
    return sjson(string);
  } catch {
    return '';
  }
}
