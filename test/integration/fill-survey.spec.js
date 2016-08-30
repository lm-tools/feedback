const helper = require('./support/integrationSpecHelper');
const surveyPage = helper.surveyPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const AnswersModel = require('../../app/models/answers-model');

describe('Explore work you could do survey', () => {
  const theType = 'ewycd';
  const theRef = '12345';

  beforeEach(() => dbHelper.cleanDb().then(() =>
    surveyPage.visit(theType, theRef)));

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
      expect(surveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
    });

    it('should populate hidden "reference id" field ', () => {
      expect(surveyPage.getRefValue()).to.eql(theRef);
    });

    it('should populate hidden "survey type" field ', () => {
      expect(surveyPage.getTypeValue()).to.eql(theType);
    });
  });

  describe('save', () => {
    it('should save empty form to database', () =>
      surveyPage.submit().then(() =>
        AnswersModel.fetchAll().then((answersList) =>
          expect(answersList.serialize()[0].data).to.eql({ ref: theRef, type: theType })
        ))
    );

    it('should save fully filled form to database');
  });
});
