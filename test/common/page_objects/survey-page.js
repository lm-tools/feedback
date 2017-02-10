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

  getQuestionText(name) {
    return this.browser.text(`[data-test-id="question-${name}"]`);
  }

  getText(selector) {
    return this.browser.text(selector);
  }

  fillCheckboxes(values) {
    values.forEach(val => this.browser.check(`[data-test-id="${val}"]`));
  }

  fillTextArea(name, value) {
    this.browser.fill(`[data-test-id="${name}"]`, value);
  }

  fillRadios(radios) {
    Object.keys(radios)
      .map(key => ({ k: key, v: radios[key] }))
      .forEach(field => this.browser.choose(`[data-test-id="${field.k}-${field.v}"]`));
  }

  isElementHidden(selector) {
    return this.browser.query(selector).className.split(/\s+/).includes('js-hidden');
  }

  submit() {
    return this.browser.click('[type="submit"]');
  }
}
module.exports = SurveyPage;
