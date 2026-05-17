import { test, expect } from '@playwright/test';
import { USERS } from './fixtures/UsersFile.js';
import { HomePage } from './pages/home.page.js';
import { LoginPage } from './pages/login.page.js';
import { BasketPage } from './pages/basket.page.js';

test.describe('Basket Functionality @basket', () => {
  
  let homePage;
  let loginPage;
  let basketPage;

/*  
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    basketPage = new BasketPage(page);

    await page.goto('http://localhost:3000/#/search');

    await expect(page.getByRole('button', { name: 'Show/hide account menu' })).toBeVisible(); // "Account" means logged out
    await expect(page.locator('.fa-layers-counter')).toBeAttached();

    await homePage.openBasket();

    await page.goto('http://localhost:3000/#/search');
*/

    test.use({storageState: {
                            cookies:[],
                            origins:[]
                          }});
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    basketPage = new BasketPage(page);

    await homePage.open();
    await homePage.openLoginPage();
    await loginPage.login(USERS.STANDARD_USER);
    
    await page.goto('http://localhost:3000/#/search');

  });

  
  
  

  test('Checking Basket Functionality', async () => {
    await homePage.addProductToBasket('Apple Juice (1000ml)');
    console.log("checking Basket 1st time");

    await homePage.addProductToBasket('Apple Pomace'); // adjust names to real products
    //await expect(homePage.cartBadge).toHaveText('2');

    await homePage.addProductToBasket('Eggfruit Juice (500ml)');
    //await expect(homePage.cartBadge).toHaveText('3');

    await homePage.openBasket();
    await basketPage.backToHome();
    await homePage.addProductToBasket('Apple Pomace');
    await homePage.openBasket();
    //await expect(homePage.cartBadge).toHaveText('4');
  });
});

