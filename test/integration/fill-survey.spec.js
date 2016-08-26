const _ = require('lodash');
const helper = require('./support/integrationSpecHelper');
const surveyPage = helper.surveyPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const AnswersModel = require('../../app/models/answers-model');

describe('Fill survey', () => {
  const theType = 'ewycd';
  const theRef = '12345';

  const expectedSurveyQuestions = [
    'Why did you set this To-Do for the Claimant?',
    'Did this help the Claimant to get someone started on job goals?',
    'What feedback has your Claimant given you about this tool?',
  ];

  const expectedSurveyAnswers = {
    'why-set': 'why-start-goals',
    'help-someone-started': 'Yes',
    'claimant-feedback': 'some feedback',
  };

  const expectedSurvey = _.merge(
    { ref: theRef, type: theType, questions: expectedSurveyQuestions }, expectedSurveyAnswers);

  beforeEach(() => dbHelper.cleanDb().then(() =>
    surveyPage.visit(theType, theRef)));

  it('should render all survey questions', () => {
    expect(surveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
  });

  it('should render all survey answer fields', () => {
    expect(surveyPage.getAnswerFieldNames()).to.eql(Object.keys(expectedSurveyAnswers));
  });

  it('should populate all survey reference fields', () => {
    expect(surveyPage.getParamValues()).to.eql([theRef, theType]);
  });

  it('should save filled form to database', () => {
    // Hmmm need to know the type otherwise it won't find the element... maybe add to
    // the expectedSurveyAnswers above ?
    surveyPage.fillAnswers(expectedSurveyAnswers);
    return surveyPage.submit().then(() =>
      AnswersModel.fetchAll().then((answersList) =>
        expect(answersList.serialize()[0].data).to.eql(expectedSurvey)
      ));
  });
});
