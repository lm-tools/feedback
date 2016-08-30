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

  getRefValue() {
    return this.browser.query('[data-test-id="param-ref"]').value;
  }
  getTypeValue() {
    return this.browser.query('[data-test-id="param-type"]').value;
  }

  getQuestionValues() {
    return this.browser.queryAll('[data-test-id^="question-"]').map(el => el.textContent.trim());
  }

  getAnswerFieldNames() {
    return this.browser.queryAll('[data-test-id^="answer-"]').map(el => el.name);
  }

  getAnswerFieldValues() {
    return this.browser.queryAll('[data-test-id^="answer-"]').map(el => el.value);
  }

  fillAnswers(fields) {
    _.map(fields, (value, key) => this.browser.fill(`[data-test-id="answer-${key}"]`, value));
  }

  submit() {
    return this.browser.click('[type="submit"]');
  }
}
module.exports = SurveyPage;
