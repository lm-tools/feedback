const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';
const browser = new Zombie();
const screenshots = require('./screenshots');
const dbHelper = require('./dbHelper');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');
const EWYCDSurveyPage = require('../../common/page_objects/ewycd-survey-page');
const ConfirmationPage = require('../../common/page_objects/confirmation-page');
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
  googleTagManagerHelper: new GoogleTagManagerHelper(browser),
  ewycdSurveyPage: new EWYCDSurveyPage(browser, basePath),
  confirmationPage: new ConfirmationPage(browser),
  dbHelper,
};
