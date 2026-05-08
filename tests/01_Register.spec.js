import { test, expect } from '@playwright/test';
import {USERS} from './UsersFile.js';

test('Register Was succesfull', async ({ page }) => {
    //await page.pause();
    await page.goto('http://localhost:3000/#/');
    
    // Close banners if they exist
    await page.getByRole('button', { name: 'Close Welcome Banner' }).click();
    await page.getByRole('button', { name: 'dismiss cookie message' }).click();
    
    
    await page.getByRole('button', { name: 'Show/hide account menu' }).click();
    await page.getByRole('menuitem', { name: 'Go to login page' }).click();
    await page.locator('#newCustomerLink').click();
    //Fill in New User Credentials
    await page.getByRole('textbox', { name: 'Email address field' }).fill(USERS.STANDARD_USER.email);
    await page.getByRole('textbox', { name: 'Field for the password' }).fill(USERS.STANDARD_USER.password);

    await page.getByText('Repeat Password').click();
    await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill('11111');
    const securityDropdown = page.getByLabel('Selection list for the security question');
    await securityDropdown.click();
   // await expect(securityDropdown).toHaveAttribute('aria-expanded', 'true');
    await page.getByRole('option', { name: /eldest siblings middle name/i}).first().click({ force: true });
    await page.locator('.mat-mdc-form-field.mat-mdc-form-field-type-mat-input.mat-form-field-appearance-outline.mat-form-field-hide-placeholder > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).fill('hi');
    await page.getByRole('button', { name: 'Button to complete the' }).click();

    const alreadyExistsError = page.getByText('Email must be unique');
  
    if (await alreadyExistsError.isVisible()) {
        console.log('User already exists. Skipping registration steps.');
        test.skip(); // This marks the test as "skipped" in your Playwright report
    return;
  }
});