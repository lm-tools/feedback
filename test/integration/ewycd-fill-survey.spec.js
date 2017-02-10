const helper = require('./support/integrationSpecHelper');
const ewycdSurveyPage = helper.ewycdSurveyPage;
const confirmationPage = helper.confirmationPage;
const errorPage = helper.errorPage;
const globalPage = helper.globalPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const commonTest = require('./common-survey-tests');

describe('Explore work you could do survey', () => {
  const theType = 'ewycd';
  const theRef = '12345';

  function aBaseAnswersWith(additionalFields) {
    return Object.assign({}, {
      whyTypesOtherReason: '',
      claimantFeedback: '',
      agentFeedback: '',
    }, additionalFields);
  }

  beforeEach(() => dbHelper.cleanDb().then(() =>
    ewycdSurveyPage.visit(theType, theRef)));

  describe('common', () => {
    commonTest(theType, theRef, 'ewycd-2', aBaseAnswersWith({}), { whyTypes: 'Latest copy ewycd' });
  });

  describe('render', () => {
    const expectedSurveyQuestions = [
      'Why did you set this to-do for the claimant?',
      'Did it help them get started on job goals?',
      'Did it help them make their job goals broader?',
      'Did it help them look for transferable skills?',
      'Did it help them update their CV?',
      'Did it help them learn about different search terms for online job searches?',
      'Did it help them do the other thing you wanted them to do?',
      'After using this tool, has the claimant changed how they search or prepare for work?',
      'What feedback has the claimant given you about this tool?',
      'What feedback would you like to give about this tool?',
    ];

    it('should render all survey questions', () => {
      expect(ewycdSurveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
    });

    [
      {
        question: 'Did this helped with start goals',
        type: 'whyTypesStartGoals',
        selector: ewycdSurveyPage.START_GOALS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with broaden goals',
        type: 'whyTypesBroadenGoals',
        selector: ewycdSurveyPage.BROADEN_GOALS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with transferable skills',
        type: 'whyTypesTransferableSkills',
        selector: ewycdSurveyPage.TRANSFERABLE_SKILLS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with update civ',
        type: 'whyTypesUpdateCv',
        selector: ewycdSurveyPage.UPDATE_CV_PANEL_SELECTOR,
      },
      {
        question: 'Did this helped with search terms',
        type: 'whyTypesSearchTerms',
        selector: ewycdSurveyPage.SEARCH_TERMS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with other thing',
        type: 'whyTypesOther',
        selector: ewycdSurveyPage.OTHER_HELPED_PANEL,
      },
    ].forEach(s => {
      it(`should hide "${s.question}" question by default`, () =>
        expect(ewycdSurveyPage.isElementHidden(s.selector)).to.eql(true)
      );

      it(`should show "${s.question}" when "${s.type}" answer clicked`, () => {
        ewycdSurveyPage.fillCheckboxes([s.type]);
        return expect(ewycdSurveyPage.isElementHidden(s.selector)).to.eql(false);
      });
    });
    it('should hide "Other reason" by default', () =>
      expect(ewycdSurveyPage.isElementHidden(ewycdSurveyPage.OTHER_REASON_PANEL)).to.eql(true)
    );

    it('should show "Other reason" when "Other" answer clicked', () => {
      ewycdSurveyPage.fillCheckboxes(['whyTypesOther']);
      return expect(ewycdSurveyPage.isElementHidden(ewycdSurveyPage.OTHER_REASON_PANEL))
        .to.eql(false);
    });

    it('should display error if user has already filled survey', () =>
      ewycdSurveyPage.submit()
        .then(() => ewycdSurveyPage.visit(theType, theRef))
        .then(() => {
          expect(globalPage.getPageId()).to.eql(errorPage.PAGE_ID);
          expect(errorPage.getMessage()).to.eql('You’ve already given feedback.');
        })
    );
  });

  describe('save', () => {
    it('should save "why did you set this" section to database', () => {
      const allWhyTypesValues = [
        'whyTypesStartGoals',
        'whyTypesBroadenGoals',
        'whyTypesTransferableSkills',
        'whyTypesUpdateCv',
        'whyTypesSearchTerms',
        'whyTypesOther',
      ];
      ewycdSurveyPage.fillCheckboxes(allWhyTypesValues);
      ewycdSurveyPage.fillOtherReason('Other reason');

      return ewycdSurveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              whyTypes: allWhyTypesValues,
              whyTypesOtherReason: 'Other reason',
            }
          ))
        );
    });

    it('should save "Did this help" section to database', () => {
      ewycdSurveyPage.fillRadios({
        startGoalsHelped: 'yes',
        broadenGoalsHelped: 'no',
        transferableSkillsHelped: 'yes',
        updateCvHelped: 'no',
        searchTermsHelped: 'yes',
        otherHelped: 'no',
      });
      return ewycdSurveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              startGoalsHelped: 'yes',
              broadenGoalsHelped: 'no',
              transferableSkillsHelped: 'yes',
              updateCvHelped: 'no',
              searchTermsHelped: 'yes',
              otherHelped: 'no',
            }
          ))
        );
    });

    it('should save "Did claimant change" to database', () => {
      ewycdSurveyPage.fillRadios({ claimantChange: 'yes' });
      return ewycdSurveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ claimantChange: 'yes' }))
        );
    });

    it('should save "Claimaint feedback" to database', () => {
      ewycdSurveyPage.fillTextArea('claimantFeedback', 'Some random text');
      return ewycdSurveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ claimantFeedback: 'Some random text' }))
        );
    });

    it('should save "Agent feedback" to database', () => {
      ewycdSurveyPage.fillTextArea('agentFeedback', 'Some agent random text');
      return ewycdSurveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ agentFeedback: 'Some agent random text' }))
        );
    });

    it('should save "Agent rating" to database', () => {
      ewycdSurveyPage.fillRadios({ rating: 3 });
      return ewycdSurveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ rating: '3' }))
        );
    });

    it('should show confirmation page', () =>
      ewycdSurveyPage.submit()
        .then(() => expect(globalPage.getPageId()).to.eql(confirmationPage.PAGE_ID))
    );
  });
});
