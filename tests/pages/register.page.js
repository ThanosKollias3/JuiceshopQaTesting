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
    // Use keyboard interaction instead of click to avoid Material label overlap
    await this.securityQuestionDropdown.focus();
    await this.page.keyboard.press('Space');
    
    // Wait for dropdown to open
    await this.page.waitForSelector('[role="listbox"]', { state: 'visible' });
    
    // Select the option
    await this.page.getByRole('option', { name: questionRegex }).first().click();
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
    try {
      return await this.emailExistsError.isVisible({ timeout: 3000 });
    } catch {
      return false;
    }
  }
}