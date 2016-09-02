class ErrorPage {

  constructor(browser) {
    this.browser = browser;
    this.PAGE_ID = 'error-page';
  }

  getMessage() {
    return this.browser.text('[data-test-id="message"]');
  }
}

module.exports = ErrorPage;
