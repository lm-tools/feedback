/**
 * Page object that contains common interfaces between all of the pages in the app
 */
class GlobalPage {
  constructor(browser) {
    this.browser = browser;
  }

  getGoogleAnalyticsUserVariable() {
    return this.browser.window.dataLayer[0].userId;
  }

  getPageId() {
    return this.browser.query('meta[name="pageId"]').content;
  }
}
module.exports = GlobalPage;
