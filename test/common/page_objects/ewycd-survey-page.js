const BaseSurveyPage = require('./survey-page');

class EWYCDSurveyPage extends BaseSurveyPage {

  fillWhyDidYouSetThis(values) {
    values.forEach(val => this.browser.check(`[data-test-id="why-type-${val}"]`));
  }

  fillOtherReason(value) {
    this.browser.fill('[data-test-id="why-other-answer"]', value);
  }

  fillTextArea(name, value) {
    this.browser.fill(`[data-test-id="${name}"]`, value);
  }

  fillYesNoRadios(radios) {
    Object.keys(radios)
      .map(key => ({ k: key, v: radios[key] }))
      .forEach(field => this.browser.choose(`[data-test-id="${field.k}-${field.v}"]`));
  }

}

module.exports = EWYCDSurveyPage;
