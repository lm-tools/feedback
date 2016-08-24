const helper = require('./support/integrationSpecHelper');
const surveyPage = helper.surveyPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const AnswersModel = require('../../app/models/answers-model');

describe('Fill survey', () => {
  const survey = { name: 'Sample name', surname: 'Sample surname' };

  beforeEach(() => dbHelper.cleanDb().then(() => surveyPage.visit()));

  it('should render all survey fields', () =>
    expect(surveyPage.getFieldsNames()).to.eql(Object.keys(survey))
  );

  it('should save filled form to database', () => {
    surveyPage.fill(survey);
    return surveyPage.submit().then(() =>
      AnswersModel.fetchAll().then((answersList) =>
        expect(answersList.serialize()[0].data).to.eql(survey)
      ));
  });
});

