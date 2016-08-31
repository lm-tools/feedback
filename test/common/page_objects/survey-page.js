class SurveyPage {
  constructor(browser, basePath) {
    this.browser = browser;
    this.basePath = basePath;
  }

  visit(ref, type) {
    let url = `${this.basePath}/survey`;

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
