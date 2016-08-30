const BaseSurveyPage = require('./survey-page');

class EWYCDSurveyPage extends BaseSurveyPage {

  fillWhyDidYouSetThis(values) {
    values.forEach(val => this.browser.check(`[data-test-id="why-type-${val}"]`));
  }

  fillOtherReason(value) {
    this.browser.fill('[data-test-id="why-other-answer"]', value);
  }

}

module.exports = EWYCDSurveyPage;
