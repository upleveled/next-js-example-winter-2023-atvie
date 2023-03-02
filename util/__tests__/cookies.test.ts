import {
  deleteCookie,
  getParsedCookie,
  setStringifiedCookie,
  stringifyCookieValue,
} from '../cookies';

// This is closest to what we want to test
// testing a single, small function that doesn't depend on a library
test('stringify a cookie value', () => {
  expect(stringifyCookieValue([{ id: 1, stars: 2 }])).toBe(
    '[{"id":1,"stars":2}]',
  );
});

test('set, get and delete a cookie', () => {
  const cookie = {
    key: 'fruitsCookie',
    value: [{ id: 1, stars: 2 }],
  };
  // First, make sure that the return value of the function is undefined
  // Use .toBe to compare primitive values
  expect(getParsedCookie(cookie.key)).toBe(undefined);
  // expect(getParsedCookie(cookie.key)).toBeUndefined();

  // Set a cookie
  expect(() => setStringifiedCookie(cookie.key, cookie.value)).not.toThrow();

  // Use .toStrictEqual to test that objects have the same type as well as structure
  expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);

  // Best practice: clear state after test to bring the system back to the initial state
  expect(deleteCookie(cookie.key)).toBe(undefined);
  expect(getParsedCookie(cookie.key)).toBe(undefined);
});
