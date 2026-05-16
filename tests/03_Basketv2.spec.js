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
    loginPage = new LoginPage(page);
    basketPage = new BasketPage(page);

    await homePage.goto();
    await homePage.dismissBanners();
    await homePage.openLoginPage();
    await loginPage.login(USERS.STANDARD_USER);
  });

  test('Login was successful', async () => {
    await homePage.openBasket();
    await homePage.openAccountMenu();
    await expect(homePage.accountMenuPanel).toContainText(`account_circle ${USERS.STANDARD_USER.email}`);
  });

  test('Checking Basket Functionality', async () => {
    await homePage.addProductToBasket('Apple Juice (1000ml)');
    await homePage.addProductToBasket('Apple Pomace'); // adjust names to real products
    await homePage.addProductToBasket('Eggfruit Juice (500ml)');
    await homePage.openBasket();
    await basketPage.backToHome();
    await homePage.addProductToBasket('Apple Pomace');
    await homePage.openBasket();
    await expect(homePage.cartBadge).toHaveText('4');
  });
});