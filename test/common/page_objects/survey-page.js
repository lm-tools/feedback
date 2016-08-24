const _ = require('lodash');
class SurveyPage {
  constructor(browser) {
    this.browser = browser;
  }

  visit() {
    return this.browser.visit('/survey');
  }

  getFieldsNames() {
    return this.browser.queryAll('[data-test-id^="field-"]').map(el => el.name);
  }

  fill(fields) {
    _.map(fields, (value, key) => this.browser.fill(`[data-test-id="field-${key}"]`, value));
  }

  submit() {
    return this.browser.click('[type="submit"]');
  }
}
module.exports = SurveyPage;
