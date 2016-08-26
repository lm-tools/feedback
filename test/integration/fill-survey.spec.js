const _ = require('lodash');
const helper = require('./support/integrationSpecHelper');
const surveyPage = helper.surveyPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const AnswersModel = require('../../app/models/answers-model');

describe('Fill survey', () => {
  const theType = 'ryws';
  const theRef = '12345';

  const expectedSurveyFields = { name: 'Sample name', surname: 'Sample surname' };
  const expectedSurvey = _.merge({ ref: theRef, type: theType }, expectedSurveyFields);

  beforeEach(() => dbHelper.cleanDb().then(() =>
    surveyPage.visit(theType, theRef)));

  it('should render all survey fields', () => {
    expect(surveyPage.getFieldsNames()).to.eql(Object.keys(expectedSurveyFields));
  });

  it('should populate all survey reference fields', () => {
    expect(surveyPage.getParamValues()).to.eql([theRef, theType]);
  });

  it('should save filled form to database', () => {
    surveyPage.fill(expectedSurveyFields);
    return surveyPage.submit().then(() =>
      AnswersModel.fetchAll().then((answersList) =>
        expect(answersList.serialize()[0].data).to.eql(expectedSurvey)
      ));
  });
});
