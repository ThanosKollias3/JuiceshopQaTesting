export class HomePage {
  constructor(page) {
    this.page = page;

    // Banners
    this.welcomeBannerCloseBtn = page.getByRole('button', { name: 'Close Welcome Banner' });
    this.cookieDismissBtn = page.getByRole('button', { name: 'dismiss cookie message' });

    // Header / account menu
    this.accountMenuBtn = page.getByRole('button', { name: 'Show/hide account menu' });
    this.goToLoginMenuItem = page.getByRole('menuitem', { name: 'Go to login page' });
    this.cartBtn = page.getByRole('button', { name: 'Show the shopping cart' });
    this.cartBadge = page.locator('.fa-layers-counter');
    this.accountMenuPanel = page.locator('#mat-menu-panel-0');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/#/');
  }

  async dismissBanners() {
    await this.welcomeBannerCloseBtn.click();
    await this.cookieDismissBtn.click();
  }

  // Convenience method: open app + dismiss banners in one call
  async open() {
    await this.goto();
    await this.dismissBanners();
  }

  async openLoginPage() {
    await this.accountMenuBtn.click();
    await this.goToLoginMenuItem.click();
  }

  async openAccountMenu() {
    await this.accountMenuBtn.click();
  }

  
  async addProductToBasket(productName) {
    await this.page
    .locator('mat-card')
    .filter({ has: this.page.locator('.item-name', { hasText: productName }) })
    .getByLabel('Add to Basket')
    .click();
  }
  async openBasket() {
    await this.cartBtn.click();
  }
}