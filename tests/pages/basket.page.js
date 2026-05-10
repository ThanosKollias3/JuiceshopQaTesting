export class BasketPage {
  constructor(page) {
    this.page = page;
    this.backToHomeBtn = page.getByRole('button', { name: 'Back to homepage' });
  }

  async backToHome() {
    await this.backToHomeBtn.click();
  }
}