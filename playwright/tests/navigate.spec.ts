import { expect, test } from '@playwright/test';

test('navigation test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('heading', { name: 'HOME' })).toBeVisible();

  await expect(page.locator('h1')).toHaveText('HOME');

  await expect(
    page.getByRole('heading', {
      name: 'image with next/image. width and height',
    }),
  ).toBeVisible();

  await expect(page.getByAltText('alpaca').first()).toBeVisible();
  await expect(page.getByRole('img', { name: 'alpaca' }).nth(1)).toBeVisible();

  await page.getByRole('link', { name: 'Animals' }).click();

  await expect(page).toHaveURL('http://localhost:3000/animals');

  await expect(page.getByRole('heading', { name: 'Animals' })).toBeVisible();

  await expect(page.getByTestId('animal-type-turtle')).toBeVisible();

  const animalNames = ['Dodo', 'Paco', 'Tira', 'Danny', 'Karl'];

  await expect(page.locator('[data-test-id^="animal-type-"]')).toHaveCount(5);
  // Use >> for direct descendant of the locator
  await expect(page.locator('[data-test-id^="animal-type-"] >> h2')).toHaveText(
    animalNames,
  );
  await expect(
    page.locator('[data-test-id^="animal-type-"] >> img'),
  ).toHaveCount(5);

  await page.getByRole('link', { name: 'Fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await page.getByRole('link', { name: 'Banana 🍌' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits/1');

  await expect(
    page.getByText('Please type something about the undefined'),
  ).toBeVisible();

  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('test');
  await page.getByRole('button', { name: 'Update Comment' }).click();

  await expect(page.getByText('test')).toBeVisible();

  await page.getByRole('link', { name: 'Fruits' }).click();
  await expect(page).toHaveURL('http://localhost:3000/fruits');

  await expect(
    page.getByRole('link', { name: 'Banana 🍌 test' }),
  ).toBeVisible();

  await expect(page.getByTestId('fruit-type-banana')).toHaveText(
    'Banana🍌test',
  );
});
