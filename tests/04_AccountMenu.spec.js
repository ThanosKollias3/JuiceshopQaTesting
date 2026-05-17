import { test, expect } from '@playwright/test';
import { USERS } from './fixtures/UsersFile.js';
import { HomePage } from './pages/home.page.js';
import { LoginPage } from './pages/login.page.js';
import { RegisterPage } from './pages/register.page.js';
import { AccountModal } from './modals/account.modal.js';

test.describe('Account Modal Functionality @account', () => {
  let registerPage;
  let homePage;
  let loginPage;
  let accountModal;
  /*
  test.use({storageState: {
                            cookies:[],
                            origins:[]
                          }});
*/

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);
    accountModal = new AccountModal(page);
    
  //  await homePage.open();
   // await homePage.openLoginPage();
    //await loginPage.goToRegister();
    await homePage.goto();
  });
  test('Account Modal' , async ({ page }) =>{

    await accountModal.navigateToAccountModal();
    await expect(page.locator('.mat-mdc-menu-panel')).toBeVisible();

    await accountModal.navigateToUserProfile();
    await expect(page.locator('h1')).toHaveText('User Profile');

  });

});