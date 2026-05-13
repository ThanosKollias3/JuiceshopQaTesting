import { test, expect } from '@playwright/test';
import { USERS } from './fixtures/UsersFile.js';
import { HomePage } from './pages/home.page.js';
import { LoginPage } from './pages/login.page.js';
import { RegisterPage } from './pages/register.page.js';

test.describe('Register functionality @register', () => {
  let registerPage;
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    
    await homePage.open();
    await homePage.openLoginPage();
    await loginPage.goToRegister();
  });

  test('Register A New User', async ({ page }) => {
    await registerPage.register({
      email: USERS.STANDARD_USER.email,
      password: USERS.STANDARD_USER.password,
      repeatPassword: USERS.STANDARD_USER.password,
      securityQuestion: /Mother's maiden name?/i,
      securityAnswer: USERS.STANDARD_USER.securityAnswer
    });

    // Check if user already exists
    if (await registerPage.isEmailAlreadyRegistered()) {
      test.skip(true, 'User already exists. Skipping registration.');
      return;
    }

    // If we get here, registration should have succeeded
    // Add assertion to verify success (optional but recommended)
    //await expect(page).toHaveURL(/.*#\/login/, { timeout: 10000 });
  });
});