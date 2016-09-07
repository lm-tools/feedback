const BaseSurveyPage = require('./survey-page');

class EWYCDSurveyPage extends BaseSurveyPage {

  constructor(browser, basePath) {
    super(browser, basePath);
    this.START_GOALS_HELPED_PANEL = '#whyTypes-start-goalsHelped-panel';
    this.BROADEN_GOALS_HELPED_PANEL = '#whyTypes-broaden-goalsHelped-panel';
    this.TRANSFERABLE_SKILLS_HELPED_PANEL = '#whyTypes-transferable-skillsHelped-panel';
    this.UPDATE_CV_PANEL_SELECTOR = '#whyTypes-update-cvHelped-panel';
    this.SEARCH_TERMS_HELPED_PANEL = '#whyTypes-search-termsHelped-panel';
    this.OTHER_HELPED_PANEL = '#whyTypes-otherHelped-panel';
    this.OTHER_REASON_PANEL = '[data-test-id="other-reason-panel"]';
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
