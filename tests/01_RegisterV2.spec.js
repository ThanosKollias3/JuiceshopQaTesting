import { test, expect } from '@playwright/test';
import { USERS } from './fixtures/UsersFile.js';
import { HomePage } from './pages/home.page.js';
import { LoginPage } from './pages/login.page.js';
import { RegisterPage } from './pages/register.page.js';

test('Register was successful', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const registerPage = new RegisterPage(page);

  await homePage.open();
  await homePage.openLoginPage();
  await loginPage.goToRegister();

  await registerPage.register({
    email: USERS.STANDARD_USER.email,
    password: USERS.STANDARD_USER.password,
    repeatPassword: USERS.STANDARD_USER.password,
    securityQuestion: /eldest siblings middle name/i,
    securityAnswer: 'hi',
  });

  if (await registerPage.isEmailAlreadyRegistered()) {
    test.skip(true, 'User already exists. Skipping registration.');
  }
});