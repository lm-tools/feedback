const _ = require('lodash');
class SurveyPage {
  constructor(browser) {
    this.browser = browser;
  }

  visit(ref, type) {
    let url = '/survey';

    if (ref) {
      url += `/${ref}`;
    }

    if (type) {
      url += `/${type}`;
    }

    return this.browser.visit(`${url}`);
  }

  getParamValues() {
    return this.browser.queryAll('[data-test-id^="param-"]').map(el => el.value);
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
