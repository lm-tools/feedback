class MainPage {
  constructor(browser, basePath) {
    this.browser = browser;
    this.basePath = basePath;
  }

  visit() {
    return this.browser.visit(`${this.basePath}/`);
  }
}
module.exports = MainPage;
