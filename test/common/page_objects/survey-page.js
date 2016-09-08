class SurveyPage {
  constructor(browser, basePath) {
    this.browser = browser;
    this.basePath = basePath;
  }

  visit(type, ref) {
    return this.browser.visit(`${this.basePath}/${type}/${ref}`);
  }

  getQuestionValues() {
    return this.browser.queryAll('[data-test-id^="question-"]').map(el => el.textContent.trim());
  }
  getText(selector) {
    return this.browser.text(selector);
  }

  submit() {
    return this.browser.click('[type="submit"]');
  }
}
module.exports = SurveyPage;
