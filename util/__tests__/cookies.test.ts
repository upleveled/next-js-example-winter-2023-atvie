test('set, get and delete a cookie', () => {
  const cookie = {
    key: 'fruitsCookie',
    value: [{ id: 1, stars: 2 }],
  };
  // First, make sure that the return value of the function is undefined
  // Use .toBe to compare primitive values
  expect(cookie.key).toBe('fruitsCookie');
  // expect(getParsedCookie(cookie.key)).toBeUndefined();

  // Use .toStrictEqual to test that objects have the same type as well as structure
  expect(cookie.value).toStrictEqual(cookie.value);
});
