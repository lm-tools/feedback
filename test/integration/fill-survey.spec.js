const helper = require('./support/integrationSpecHelper');
const ewycdSurveyPage = helper.ewycdSurveyPage;
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
      ewycdSurveyPage.fillYesNoRadios({
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
      ewycdSurveyPage.fillYesNoRadios({ claimantChange: 'yes' });
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
  });
});
