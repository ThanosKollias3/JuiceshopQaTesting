export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Text field for the login email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Text field for the login password' });
    this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
    this.errorMessage = page.getByText('Invalid email or password.');
    this.newCustomerLink = page.locator('#newCustomerLink');
  }

  async login(user) {
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.loginBtn.click();
  }

  // Convenience overload for negative tests with raw credentials
  async loginWithCredentials(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async goToRegister() {
    await this.newCustomerLink.click();
  }
}