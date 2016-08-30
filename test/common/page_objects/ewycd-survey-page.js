const BaseSurveyPage = require('./survey-page');

class EWYCDSurveyPage extends BaseSurveyPage {

  fillWhyDidYouSetThis(values) {
    values.forEach(val => this.browser.check(`[data-test-id="why-type-${val}"]`));
  }

  fillOtherReason(value) {
    this.browser.fill('[data-test-id="why-other-answer"]', value);
  }

  fillDidThisHelpSection(fields) {
    Object.keys(fields)
      .map(key => ({ k: key, v: fields[key] }))
      .forEach(field => this.browser.choose(`[data-test-id="${field.k}-${field.v}"]`));
  }

}

module.exports = EWYCDSurveyPage;
