/**
 * Page object that contains common interfaces between all of the pages in the app
 */
class GlobalPage {
  constructor(browser, basePath) {
    this.browser = browser;
    this.basePath = basePath;
  }

  getGoogleAnalyticsUserVariable() {
    return this.browser.window.dataLayer[0].userId;
  }

  getPageId() {
    return this.browser.query('meta[name="pageId"]').content;
  }

  visit(url) {
    return this.browser.visit(`${this.basePath}${url}`);
  }
}
module.exports = GlobalPage;
