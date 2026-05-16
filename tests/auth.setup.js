/*import {test as setup} from '@playwright/test';
import {USERS} from './fixtures/UsersFile.js';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page})=>{
  await page.goto('http://localhost:3000/#/');
  await page.getByRole('button', { name: 'Close Welcome Banner' }).click();
  await page.getByRole('button', { name: 'dismiss cookie message' }).click();
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill(USERS.STANDARD_USER.email);
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(USERS.STANDARD_USER.password);
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await page.waitForURL(/.*#\/search/);

  await page.context().storageState({path: authFile});
  
})*/
import { test as setup } from '@playwright/test';
import { USERS } from './fixtures/UsersFile.js';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  console.log('🔐 Setting up authentication...');
  
  await page.goto('http://localhost:3000/#/');
  
  // Dismiss banners
  try {
    await page.getByRole('button', { name: 'Close Welcome Banner' }).click({ timeout: 3000 });
  } catch {}
  
  try {
    await page.getByRole('button', { name: 'dismiss cookie message' }).click({ timeout: 3000 });
  } catch {}
  
  // Go to login page
  await page.getByRole('button', { name: 'Show/hide account menu' }).click();
  await page.getByRole('menuitem', { name: 'Go to login page' }).click();
  
  // Try to login first (in case user already exists)
  console.log('🔑 Attempting login...');
  await page.getByRole('textbox', { name: 'Text field for the login email' }).fill(USERS.STANDARD_USER.email);
  await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(USERS.STANDARD_USER.password);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  
  // Check if login succeeded
  try {
    await page.waitForURL(/.*#\/(search|)$/, { timeout: 5000 });
    console.log('✅ Login successful (user already existed)');
  } catch {
    console.log('❌ Login failed, user might not exist. Registering...');
    
    // Login failed, need to register
    await page.goto('http://localhost:3000/#/register');
    
    // Register the user
    await page.getByRole('textbox', { name: 'Email address field' }).fill(USERS.STANDARD_USER.email);
    await page.getByRole('textbox', { name: 'Field for the password' }).fill(USERS.STANDARD_USER.password);
    await page.getByRole('textbox', { name: 'Field to confirm the password' }).fill(USERS.STANDARD_USER.password);
    
    // Select security question
    await page.getByLabel('Selection list for the security question').focus();
    await page.keyboard.press('Space');
    await page.waitForSelector('[role="listbox"]', { state: 'visible' });
    await page.getByRole('option', { name: /Mother's maiden name?/i }).first().click();
    
    await page.getByRole('textbox', { name: 'Field for the answer to the' }).fill(USERS.STANDARD_USER.securityAnswer);
    await page.getByRole('button', { name: 'Button to complete the' }).click();
    
    // Wait for redirect to login page after registration
    await page.waitForURL(/.*#\/login/);
    
    console.log('✅ Registration successful, now logging in...');
    
    // Now login with newly registered user
    await page.getByRole('textbox', { name: 'Text field for the login email' }).fill(USERS.STANDARD_USER.email);
    await page.getByRole('textbox', { name: 'Text field for the login password' }).fill(USERS.STANDARD_USER.password);
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    
    await page.waitForURL(/.*#\/(search|)$/, { timeout: 10000 });
    console.log('✅ Login successful after registration');
  }
  
  // Save authentication state
  await page.context().storageState({ path: authFile });
  console.log(`✅ Auth state saved to ${authFile}`);
});