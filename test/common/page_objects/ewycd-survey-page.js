const BaseSurveyPage = require('./survey-page');

class EWYCDSurveyPage extends BaseSurveyPage {

  constructor(browser, basePath) {
    super(browser, basePath);
    this.START_GOALS_HELPED_PANEL = '#whyTypesStartGoalsHelped-panel';
    this.BROADEN_GOALS_HELPED_PANEL = '#whyTypesBroadenGoalsHelped-panel';
    this.TRANSFERABLE_SKILLS_HELPED_PANEL = '#whyTypesTransferableSkillsHelped-panel';
    this.UPDATE_CV_PANEL_SELECTOR = '#whyTypesUpdateCvHelped-panel';
    this.SEARCH_TERMS_HELPED_PANEL = '#whyTypesSearchTermsHelped-panel';
    this.OTHER_HELPED_PANEL = '#whyTypesOtherHelped-panel';
    this.OTHER_REASON_PANEL = '[data-test-id="other-reason-panel"]';
    this.QUESTION_WHY_TYPES = '[data-test-id="question-why-types"]';
  }

  fillWhyDidYouSetThis(values) {
    values.forEach(val => this.browser.check(`[data-test-id="${val}"]`));
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
