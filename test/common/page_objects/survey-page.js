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

  submit() {
    return this.browser.click('[type="submit"]');
  }
}
module.exports = SurveyPage;
