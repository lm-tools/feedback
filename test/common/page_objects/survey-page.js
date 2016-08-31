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

  submit() {
    return this.browser.click('[type="submit"]');
  }
}
module.exports = SurveyPage;
