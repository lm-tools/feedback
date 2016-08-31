const helper = require('./support/integrationSpecHelper');
const ewycdSurveyPage = helper.ewycdSurveyPage;
const confirmationPage = helper.confirmationPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const AnswersModel = require('../../app/models/answers-model');

describe('Explore work you could do survey', () => {
  const theType = 'ewycd';
  const theRef = '12345';

  function fetchFirstSurveyFromDB() {
    return AnswersModel.fetchAll().then(results => results.serialize()[0]);
  }

  function aBaseAnswersWith(additionalFields) {
    return Object.assign({}, {
      ref: theRef,
      type: theType,
      whyTypeOtherReason: '',
      claimantFeedback: '',
      agentFeedback: '',
    }, additionalFields);
  }

  beforeEach(() => dbHelper.cleanDb().then(() =>
    ewycdSurveyPage.visit(theType, theRef)));

  describe('render', () => {
    const expectedSurveyQuestions = [
      'Why did you set this To-Do for the Claimant?',
      'Did this help the Claimant to get someone started on job goals?',
      'Did this help the Claimant to broaden job goals?',
      'Did this help the Claimant to look for transferable skills?',
      'Did this help the Claimant to update their CV?',
      'Did this help the Claimant to look for alternative ' +
      'search terms for their online job search?',
      'Did this help the Claimant to do the other thing you wanted them to do?',
      'Has the Claimant changed how they search or prepare for work after using this tool?',
      'What feedback has your Claimant given you about this tool?',
      'What feedback would you like to give about this tool?',
    ];

    it('should render all survey questions', () => {
      expect(ewycdSurveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
    });

    it('should populate hidden "reference id" field ', () => {
      expect(ewycdSurveyPage.getRefValue()).to.eql(theRef);
    });

    it('should populate hidden "survey type" field ', () => {
      expect(ewycdSurveyPage.getTypeValue()).to.eql(theType);
    });

    [
      {
        question: 'Did this helped with start goals',
        type: 'start-goals',
        selector: ewycdSurveyPage.START_GOALS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with broaden goals',
        type: 'broaden-goals',
        selector: ewycdSurveyPage.BROADEN_GOALS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with transferable skills',
        type: 'transferable-skills',
        selector: ewycdSurveyPage.TRANSFERABLE_SKILLS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with update civ',
        type: 'update-cv',
        selector: ewycdSurveyPage.UPDATE_CV_PANEL_SELECTOR,
      },
      {
        question: 'Did this helped with search terms',
        type: 'search-terms',
        selector: ewycdSurveyPage.SEARCH_TERMS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with other thing',
        type: 'other',
        selector: ewycdSurveyPage.OTHER_HELPED_PANEL,
      },
    ].forEach(s => {
      it(`should hide "${s.question}" question by default`, () =>
        expect(ewycdSurveyPage.isElementHidden(s.selector)).to.eql(true)
      );

      it(`should show "${s.question}" when "${s.type}" answer clicked`, () => {
        ewycdSurveyPage.fillWhyDidYouSetThis([s.type]);
        return expect(ewycdSurveyPage.isElementHidden(s.selector)).to.eql(false);
      });
    });
    it('should hide "Other reason" by default', () =>
      expect(ewycdSurveyPage.isElementHidden(ewycdSurveyPage.OTHER_REASON_PANEL)).to.eql(true)
    );

    it('should show "Other reason" when "Other" answer clicked', () => {
      ewycdSurveyPage.fillWhyDidYouSetThis(['other']);
      return expect(ewycdSurveyPage.isElementHidden(ewycdSurveyPage.OTHER_REASON_PANEL))
        .to.eql(false);
    });
  });

  describe('save', () => {
    it('should save empty form to database', () =>
      ewycdSurveyPage.submit()
        .then(() => fetchFirstSurveyFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({
            ref: theRef,
            type: theType,
          }
          ))
        )
    );

    it('should save "why did you set this" section to database', () => {
      const allWhyTypesValues = [
        'start-goals',
        'broaden-goals',
        'transferable-skills',
        'update-cv',
        'search-terms',
        'other',
      ];
      ewycdSurveyPage.fillWhyDidYouSetThis(allWhyTypesValues);
      ewycdSurveyPage.fillOtherReason('Other reason');

      return ewycdSurveyPage.submit()
        .then(() => fetchFirstSurveyFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              whyTypes: allWhyTypesValues,
              whyTypeOtherReason: 'Other reason',
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
        .then(() => fetchFirstSurveyFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              startGoalsHelped: 'true',
              broadenGoalsHelped: 'false',
              transferableSkillsHelped: 'true',
              updateCvHelped: 'false',
              searchTermsHelped: 'true',
              otherHelped: 'false',
            }
          ))
        );
    });

    it('should save "Did claimant change" to database', () => {
      ewycdSurveyPage.fillRadios({ claimantChange: 'yes' });
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstSurveyFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ claimantChange: 'true' }))
        );
    });

    it('should save "Claimaint feedback" to database', () => {
      ewycdSurveyPage.fillTextArea('claimantFeedback', 'Some random text');
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstSurveyFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ claimantFeedback: 'Some random text' }))
        );
    });

    it('should save "Agent feedback" to database', () => {
      ewycdSurveyPage.fillTextArea('agentFeedback', 'Some agent random text');
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstSurveyFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ agentFeedback: 'Some agent random text' }))
        );
    });

    it('should save "Agent rating" to database', () => {
      ewycdSurveyPage.fillRadios({ rating: 3 });
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstSurveyFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ rating: '3' }))
        );
    });

    it('should show confirmation page', () =>
      ewycdSurveyPage.submit()
        .then(() => expect(confirmationPage.getPageId()).to.eql(confirmationPage.PAGE_ID))
    );
  });
});
