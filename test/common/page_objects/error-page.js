class ErrorPage {

  constructor(browser) {
    this.browser = browser;
    this.PAGE_ID = 'error-page';
  }

  getMessage() {
    return this.browser.text('[data-test-id="message"]');
  }

  getErrorDetails() {
    return this.browser.text('[data-test="error-details"]');
  }
}

module.exports = ErrorPage;
