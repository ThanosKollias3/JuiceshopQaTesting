import { expect } from '@playwright/test';
export class AccountModal{
  constructor(page) {
    this.page = page;


    //Account Menu button
    this.accountMenuBtn = page.getByRole('button', { name: 'Show/hide account menu' });
    // User Profile button
    this.userProfile = page.getByRole('menuitem',{name: 'Go to user profile'});
    // Orders Menu button
    this.paymentMenu = page.getByRole('button',{name:'Show Orders and Payment Menu'});
    //Privacy and Security Menu button
    this.privacyMenu = page.getByRole('button',{name:'Show Privacy and Security Menu'});
    //Logout button
    this.logoutButton = page.getByRole('button',{name:'Logout'});
    // Account menu 
    this.menuModal = page.locator('.mat-mdc-menu-panel');
    this.goToLoginMenuItem = page.getByRole('menuitem', { name: 'Go to login page' });
    this.cartBtn = page.getByRole('button', { name: 'Show the shopping cart' });
    this.cartBadge = page.locator('.fa-layers-counter');
    this.accountMenuPanel = page.locator('#mat-menu-panel-0');
  }
  
  async navigateToAccountModal(){
    await this.accountMenuBtn.click();
  }
  async navigateToUserProfile(){
    await this.userProfile.click();
    await this.page.waitForURL('/**/profile', { timeout: 10000 });
  }

  async navigateToPaymentMenu(){
    await this.paymentMenu.click();
  }

  async navigateToPrivacyMenu(){
    await this.privacyMenu.click();
  }
  async logout(){
    await this.logoutButton.click();
  }
  async accountMenuTable(){
    await this.menuModal.click();
  }

}