const helper = require('./support/integrationSpecHelper');
const surveyPage = helper.surveyPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const commonTest = require('./common-survey-tests');

describe('Record your work search survey', () => {
  const theType = 'ryws';
  const theRef = '12345';

  function aBaseAnswersWith(additionalFields) {
    return Object.assign({}, {
      agentInToolOrJournalWhy: '',
      otherInformation: '',
    }, additionalFields);
  }

  beforeEach(() => dbHelper.cleanDb().then(() =>
    surveyPage.visit(theType, theRef)));

  describe('common', () => {
    commonTest(theType, theRef, 'ryws-2', aBaseAnswersWith({}),
      { otherInformation: 'Latest copy ryws' }
    );
  });

  describe('render', () => {
    const expectedSurveyQuestions = [
      'Does the job list give you an at-a-glance overview of all the claimant’s applications?',
      'Does the timeline give a useful summary of a claimant’s work search?',
      'Do you prefer to review a claimant’s work search in the tool or in the journal?',
      'Does the claimant prefer to record their work search in the tool or in the journal?',
      'How much did this tool help you and the claimant have a better work search review?',
      'Do you have any other feedback about this tool?',
    ];

    it('should render all survey questions', () => {
      expect(surveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
    });
  });

  describe('save', () => {
    [
      { field: 'atGlance', options: ['yes', 'no', 'notSure'] },
      { field: 'usefulSummary', options: ['yes', 'no', 'notSure'] },
      { field: 'agentInToolOrJournal', options: ['tool', 'journal', 'notSure'] },
      { field: 'claimantInToolOrJournal', options: ['tool', 'journal', 'notSure'] },
      { field: 'wasItHelpful', options: ['1', '2', '3', '4', '5'] },
    ].forEach(s => {
      s.options.forEach(option => {
        it(`should save "${s.field}" answer "${option}" to database'`, () => {
          const form = {};
          form[s.field] = option;
          surveyPage.fillRadios(form);
          return surveyPage.submit()
            .then(() => dbHelper.fetchFirstAnswersModelFromDB())
            .then(result =>
              expect(result.data).to.eql(aBaseAnswersWith(
                form
              ))
            );
        });
      });
    });


    [
      { agentInToolOrJournalWhy: 'Value for text area agentInToolOrJournalWhy' },
      { otherInformation: 'Value for text area otherInformation' },
    ].forEach(s => {
      const key = Object.keys(s)[0];

      it(`should save "${key}" to database`, () => {
        surveyPage.fillTextArea(key, s[key]);
        return surveyPage.submit()
          .then(() => dbHelper.fetchFirstAnswersModelFromDB())
          .then(result =>
            expect(result.data).to.eql(aBaseAnswersWith(s))
          );
      });
    });
  });
});
