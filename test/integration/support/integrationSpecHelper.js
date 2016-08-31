const Zombie = require('zombie');
Zombie.site = 'http://localhost:3000';
const browser = new Zombie();
const screenshots = require('./screenshots');
const dbHelper = require('./dbHelper');
const GoogleTagManagerHelper = require('../../common/page_objects/google-tag-manager-helper');
const MainPage = require('../../common/page_objects/main-page');
const EWYCDSurveyPage = require('../../common/page_objects/ewycd-survey-page');

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
  mainPage: new MainPage(browser),
  ewycdSurveyPage: new EWYCDSurveyPage(browser),
  dbHelper,
};
