const helper = require('./support/integrationSpecHelper');
const surveyPage = helper.surveyPage;
const globalPage = helper.globalPage;
const errorPage = helper.errorPage;
const dbHelper = helper.dbHelper;
const AnswersModel = require('../../app/models/answers-model');
const SurveyModel = require('../../app/models/survey-model');
const confirmationPage = helper.confirmationPage;

module.exports = function (theType, theRef, surveyId, emptyAnswersObject, nextVersionLabel) {
  const nextVersionLabelKey = Object.keys(nextVersionLabel)[0];

  describe('render', () => {
    it('should display error if user has already filled survey', () =>
      surveyPage.submit()
        .then(() => surveyPage.visit(theType, theRef))
        .then(() => {
          expect(globalPage.getPageId()).to.eql(errorPage.PAGE_ID);
          expect(errorPage.getMessage()).to.eql('You’ve already given feedback.');
        })
    );
  });

  describe('analytics', () => {
    it('should contain valid google tag manager data', () =>
      surveyPage.visit(theType, theRef).then(() =>
        expect(globalPage.getGoogleAnalyticsUserVariable()).to.equal('set-me-in-controller')
      )
    );
  });

  describe('save', () => {
    it('should save empty form to database', () =>
      surveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(emptyAnswersObject)
        )
    );

    it('should save refId and survey type', () =>
      surveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result => {
          expect(result.ref).to.eql(theRef);
          expect(result.survey).to.eql(theType);
        })
    );

    it('should save survey_id', () =>
      surveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result => {
          expect(result.survey_id).to.eql(surveyId);
        })
    );

    it('should show confirmation page', () =>
      surveyPage.submit()
        .then(() => expect(globalPage.getPageId()).to.eql(confirmationPage.PAGE_ID))
    );
  });

  describe('versions', () => {
    before(() => new SurveyModel({
      id: 'latest',
      type: theType,
      definition: { labels: nextVersionLabel, options: {} },
    }).save(null, { method: 'insert' })
      .then(() => surveyPage.visit(theType, theRef))
    );

    after(() => new AnswersModel().query({ where: { survey_id: 'latest' } }).destroy()
      .then(() => new SurveyModel({ id: 'latest' }).destroy()));

    it('should save latest survey_id', () =>
      surveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result => {
          expect(result.survey_id).to.eql('latest');
        })
    );

    it('should render latest survey', () =>
      expect(surveyPage.getQuestionText(nextVersionLabelKey))
        .to.eql(nextVersionLabel[nextVersionLabelKey])
    );
  });
};
