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
  }

  fillOtherReason(value) {
    this.browser.fill('[data-test-id="why-other-answer"]', value);
  }

}

module.exports = EWYCDSurveyPage;
