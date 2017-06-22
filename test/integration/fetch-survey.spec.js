/* eslint-disable quote-props, max-len */
const childProcess = require('child_process');
const moment = require('moment');
const path = require('path');
const fetchSurveyScript = path.join(__dirname, '..', '..', 'scripts/fetch-survey.js');
const dbHelper = require('./support/dbHelper');
const expect = require('chai').expect;
const rywsSurveyDefinition = require('../../db/migrations/20160908164924_ryws-survey-definition')
  .definition;
const ewycdSurveyDefinition = require('../../db/migrations/20160908142125_ewycd-2-definition')
  .definition;
const cyaSurveyDefinition = require('../../db/migrations/20170210111030_cya-definition')
  .definition;
const expectedDateFormat = 'YYYY-MM-DD HH:mm:ss';
const sampleDate = new Date('2017-01-31 12:30:25');

function mockFeedbackEntry(surveyDefinition) {
  return ({
    survey_id: surveyDefinition.id,
    ref: surveyDefinition.type,
    data: {
      some: 'some data',
    },
    created_at: sampleDate,
  });
}

describe('Fetch Survey', () => {
  [
    ewycdSurveyDefinition, rywsSurveyDefinition, cyaSurveyDefinition,
  ].forEach(surveyDefinition => {
    describe(`Fetch "${surveyDefinition.type}" survey`, () => {
      describe(`executing "scripts/fetch-survey.js ${surveyDefinition.id}"`, () => {
        let result;
        const sampleFeedback = mockFeedbackEntry(surveyDefinition);

        before(() =>
          dbHelper.cleanDb()
            .then(() => dbHelper.createAnswersInDb(sampleFeedback))
            .then(() => {
              result = childProcess.spawnSync(fetchSurveyScript, [surveyDefinition.id]);
            })
        );

        it('should execute without error', () => {
          expect(result.status).to.eql(0);
        });

        it('should return labels for all the questions', () => {
          expect(JSON.parse(result.stdout)).to.have.property('labels').that
            .include.keys(Object.keys(surveyDefinition.definition.labels));
        });

        it('should return predefined options', () => {
          expect(JSON.parse(result.stdout)).to.have.property('options')
            .that.eql(surveyDefinition.definition.options);
        });

        it('should return answers', () => {
          expect(JSON.parse(result.stdout)).to.have.property('answers').that.eql(
            [
              Object.assign({},
                sampleFeedback.data,
                { refId: sampleFeedback.ref },
                { createdAt: moment(sampleFeedback.created_at).format(expectedDateFormat) }
              ),
            ]
          );
        });
      });
    });
  });

  describe('Should manage a lot of feedback', () => {
    let result;
    const noOfFeedbackEntries = 5000;

    before(() =>
      dbHelper.cleanDb()
        .then(() => dbHelper.createAnswersInDb(mockFeedbackEntry(ewycdSurveyDefinition), noOfFeedbackEntries))
        .then(() => {
          result = childProcess.spawnSync(fetchSurveyScript, [ewycdSurveyDefinition.id]);
        })
    );

    it('should return the correct number of feedback records', () =>
      expect(JSON.parse(result.stdout).answers.length).to.equal(noOfFeedbackEntries)
    );
  });
});
