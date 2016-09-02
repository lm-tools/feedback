const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';
const browser = new Zombie();
const screenshots = require('./screenshots');
const dbHelper = require('./dbHelper');
const GlobalPage = require('../../common/page_objects/global-page');
const EWYCDSurveyPage = require('../../common/page_objects/ewycd-survey-page');
const ConfirmationPage = require('../../common/page_objects/confirmation-page');
const ErrorPage = require('../../common/page_objects/error-page');
const basePath = process.env.EXPRESS_BASE_PATH || '';
process.env.GOOGLE_TAG_MANAGER_ID = 'fake-id';
require('../../../bin/www'); // This starts the web server, and ensures it is only
                          // started once. It is a misuse of "require", and
                          // should be improved.

afterEach(function () {
  if (this.currentTest.state === 'failed') {
    screenshots.takeScreenshot(this.currentTest, browser);
  }
});

module.exports = {
  browser,
  globalPage: new GlobalPage(browser),
  ewycdSurveyPage: new EWYCDSurveyPage(browser, basePath),
  confirmationPage: new ConfirmationPage(browser),
  errorPage: new ErrorPage(browser),
  dbHelper,
};
