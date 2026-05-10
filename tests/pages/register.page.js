export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email address field' });
    this.passwordInput = page.getByRole('textbox', { name: 'Field for the password' });
    this.repeatPasswordInput = page.getByRole('textbox', { name: 'Field to confirm the password' });
    this.securityQuestionDropdown = page.getByLabel('Selection list for the security question');
    this.securityAnswerInput = page.getByRole('textbox', { name: 'Field for the answer to the' });
    this.registerBtn = page.getByRole('button', { name: 'Button to complete the' });
    this.emailExistsError = page.getByText('Email must be unique');
  }

  async selectSecurityQuestion(questionRegex) {
    await this.securityQuestionDropdown.click();
    await this.page.getByRole('option', { name: questionRegex }).first().click({ force: true });
  }

  async register({ email, password, repeatPassword, securityQuestion, securityAnswer }) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(repeatPassword);
    await this.selectSecurityQuestion(securityQuestion);
    await this.securityAnswerInput.fill(securityAnswer);
    await this.registerBtn.click();
  }

  async isEmailAlreadyRegistered() {
    return await this.emailExistsError.isVisible();
  }
}