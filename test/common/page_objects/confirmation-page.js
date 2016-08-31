class ConfirmationPage {

  constructor(browser) {
    this.browser = browser;
    this.PAGE_ID = 'confirmation';
  }

  getPageId() {
    return this.browser.query('meta[name="pageId"]').content;
  }
}

module.exports = ConfirmationPage;
