const BaseSurveyPage = require('./survey-page');

class EWYCDSurveyPage extends BaseSurveyPage {

  constructor(browser, basePath) {
    super(browser, basePath);
    this.START_GOALS_HELPED_PANEL = '#startGoalsHelped-panel';
    this.BROADEN_GOALS_HELPED_PANEL = '#broadenGoalsHelped-panel';
    this.TRANSFERABLE_SKILLS_HELPED_PANEL = '#transferableSkillsHelped-panel';
    this.UPDATE_CV_PANEL_SELECTOR = '#updateCvHelped-panel';
    this.SEARCH_TERMS_HELPED_PANEL = '#searchTermsHelped-panel';
    this.OTHER_HELPED_PANEL = '#otherHelped-panel';
    this.OTHER_REASON_PANEL = '[data-test-id="other-reason-panel"]';
  }

  fillWhyDidYouSetThis(values) {
    values.forEach(val => this.browser.check(`[data-test-id="why-type-${val}"]`));
  }

  fillOtherReason(value) {
    this.browser.fill('[data-test-id="why-other-answer"]', value);
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
}

module.exports = EWYCDSurveyPage;