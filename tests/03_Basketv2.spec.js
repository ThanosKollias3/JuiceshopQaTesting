import { test, expect } from '@playwright/test';
import { USERS } from './fixtures/UsersFile.js';
import { HomePage } from './pages/home.page.js';
import { LoginPage } from './pages/login.page.js';
import { BasketPage } from './pages/basket.page.js';

test.describe('Basket Functionality @basket', () => {
  let homePage;
  let loginPage;
  let basketPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    basketPage = new BasketPage(page);

    await page.goto('http://localhost:3000/#/');
    await page.waitForLoadState('networkidle');

    // Clear any basket items left over from previous runs
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };
    const res = await page.request.get('http://localhost:3000/rest/basket', { headers });
    if (res.ok()) {
      const { data } = await res.json();
      for (const product of data?.Products ?? []) {
        await page.request.delete(
          `http://localhost:3000/api/BasketItems/${product.BasketItem.id}`,
          { headers }
        );
      }
    }
  });

  test('Login was successful', async () => {
    await homePage.openBasket();
    await homePage.openAccountMenu();
    await expect(homePage.accountMenuPanel).toContainText(`account_circle ${USERS.STANDARD_USER.email}`);
  });

  test('Checking Basket Functionality', async () => {
    await homePage.addProductToBasket('Apple Juice (1000ml)');
    await expect(homePage.cartBadge).toHaveText('1');

    await homePage.addProductToBasket('Apple Pomace'); // adjust names to real products
    await expect(homePage.cartBadge).toHaveText('2');

    await homePage.addProductToBasket('Eggfruit Juice (500ml)');
    await expect(homePage.cartBadge).toHaveText('3');

    await homePage.openBasket();
    await basketPage.backToHome();
    await homePage.addProductToBasket('Apple Pomace');
    await homePage.openBasket();
    await expect(homePage.cartBadge).toHaveText('4');
  });
});