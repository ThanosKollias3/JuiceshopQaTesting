import { test, expect } from '@playwright/test';

test.describe('Login and test functionality',()=>{
  
  test.beforeEach(async({page})=>{
    await page.goto('http://localhost:3000/#/');
    await page.getByRole('button', { name: 'Close Welcome Banner' }).click();
    await page.getByRole('button', { name: 'dismiss cookie message' }).click();
    await page.getByRole('button', { name: 'Show/hide account menu' }).click();
    await page.getByRole('menuitem',{name: 'Go to login page'}).click();
    await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('xaxaxax@gmail.com');
    await page.locator('.mat-mdc-text-field-wrapper.mdc-text-field.mdc-text-field--outlined > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').first().click({
     modifiers: ['ControlOrMeta']
     });
    await page.getByRole('textbox', { name: 'Text field for the login password' }).click();
    await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('11111');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
  });
  test('Login was succesfull',async({page})=>{
    await expect(page.locator('div').filter({ hasText: 'All ProductsApple Juice (' }).first()).toBeVisible();
    await page.getByRole('button', { name: 'Show the shopping cart' }).click();
    await page.getByRole('button', { name: 'Show/hide account menu' }).click();
    await expect(page.locator('#mat-menu-panel-0')).toContainText('account_circle xaxaxax@gmail.com');
  });
  test('Checking Basket Functionality',async({page}) =>{
    await page.locator('mat-card').filter({ hasText: 'Apple Pomace0.89¤Add to Basket' }).getByLabel('Add to Basket').click();
    await page.locator('mat-grid-tile:nth-child(8) > .mat-grid-tile-content > .mat-mdc-card > .mdc-card > .basket-btn-container > .mdc-button').click();
    await page.locator('mat-grid-tile:nth-child(10) > .mat-grid-tile-content > .mat-mdc-card > .mdc-card > .basket-btn-container > .mdc-button').click();
    await page.getByRole('button', { name: 'Show the shopping cart' }).click();
    await page.getByRole('button', { name: 'Back to homepage' }).click();
    await page.locator('mat-card').filter({ hasText: 'Apple Pomace0.89¤Add to Basket' }).getByLabel('Add to Basket').click();
    await page.getByRole('button', { name: 'Show the shopping cart' }).click();
    
  });
});

test('Wrong Login Credentials',async({page})=>{
  await page.goto('http://localhost:3000/#/');
  await page.getByRole('button', { name: 'Close Welcome Banner' }).click();
  await page.getByRole('button', { name: 'dismiss cookie message' }).click();
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();
  await page.getByRole('menuitem',{name: 'Go to login page'}).click();
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill('xaxx@gmail.com');
  await page.locator('.mat-mdc-text-field-wrapper.mdc-text-field.mdc-text-field--outlined > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').first().click({
   modifiers: ['ControlOrMeta']
   });
  await page.getByRole('textbox', { name: 'Text field for the login password' }).click();
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill('111');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.locator('.error.ng-star-inserted')).toHaveText('Invalid email or password.');
});