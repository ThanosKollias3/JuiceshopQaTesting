import { test, expect } from '@playwright/test';
import { USERS } from './fixtures/UsersFile.js';
import { HomePage } from './pages/home.page.js';
import { LoginPage } from './pages/login.page.js';

test.describe('Login functionality @login', () => {
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.open();
    await homePage.openLoginPage();
  });

  test('Login was successful', async () => {
    await loginPage.login(USERS.STANDARD_USER);
    await homePage.openBasket();
    await homePage.openAccountMenu();
    await expect(homePage.accountMenuPanel).toContainText(
      `account_circle ${USERS.STANDARD_USER.email}`
    );
  });

  test('Wrong login credentials show an error', async () => {
    await loginPage.loginWithCredentials('xaxx@gmail.com', '111');
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password.');
  });
});