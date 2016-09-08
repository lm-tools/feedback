/* eslint-disable quote-props, max-len */
const childProcess = require('child_process');
const path = require('path');
const fetchSurveyScript = path.join(__dirname, '..', '..', 'scripts/fetch-survey.js');
const AnswerModel = require('../../app/models/answers-model');
const dbHelper = require('./support/dbHelper');
const expect = require('chai').expect;

describe('Fetch survey script', () => {
  describe('executing "scripts/fetch-survey.js ewycd-1"', () => {
    const sampleAnswers = {
      survey_id: 'ewycd-1',
      ref: '123',
      data: {
        whyTypes: [
          'whyTypesStartGoals',
          'whyTypesBroadenGoals',
          'whyTypesTransferableSkills',
          'whyTypesUpdateCv',
          'whyTypesSearchTerms',
          'whyTypesOther',
        ],
        whyTypesOtherReason: 'asdf',
        startGoalsHelped: 'no',
        broadenGoalsHelped: 'yes',
        transferableSkillsHelped: 'no',
        updateCvHelped: 'yes',
        searchTermsHelped: 'no',
        otherHelped: 'yes',
        claimantChange: 'no',
        claimantFeedback: 'adsf',
        agentFeedback: 'asdf',
        rating: '2',
      },
    };
    let result;
    before(() =>
      dbHelper.cleanDb()
        .then(() => new AnswerModel(sampleAnswers).save()
        ).then(() => {
          result = childProcess.spawnSync(fetchSurveyScript, ['ewycd-1']);
        })
    );

    it('should execute without error', () => {
      expect(result.status).to.eql(0);
    });

    it('should return labels for all the questions', () => {
      expect(JSON.parse(result.stdout)).to.have.property('labels').that.include.keys(
        [
          'whyTypes',
          'whyTypesStartGoals',
          'whyTypesBroadenGoals',
          'whyTypesTransferableSkills',
          'whyTypesUpdateCv',
          'whyTypesSearchTerms',
          'whyTypesOther',
          'whyTypesOtherReason',
          'yes',
          'no',
          'startGoalsHelped',
          'broadenGoalsHelped',
          'transferableSkillsHelped',
          'updateCvHelped',
          'searchTermsHelped',
          'otherHelped',
          'claimantChange',
          'claimantFeedback',
          'agentFeedback',
          'rating',
        ]);
    });

    it('should return predefined options', () => {
      expect(JSON.parse(result.stdout)).to.have.property('options').that.eql(
        {
          'whyTypes': [
            'whyTypesStartGoals',
            'whyTypesBroadenGoals',
            'whyTypesTransferableSkills',
            'whyTypesUpdateCv',
            'whyTypesSearchTerms',
            'whyTypesOther',
          ],
          'startGoalsHelped': ['yes', 'no'],
          'broadenGoalsHelped': ['yes', 'no'],
          'transferableSkillsHelped': ['yes', 'no'],
          'updateCvHelped': ['yes', 'no'],
          'searchTermsHelped': ['yes', 'no'],
          'otherHelped': ['yes', 'no'],
          'claimantChange': ['yes', 'no'],
          'agentFeedback': ['yes', 'no'],
          'rating': ['5', '4', '3', '2', '1'],
        }
      );
    });

    it('should return answers', () => {
      expect(JSON.parse(result.stdout)).to.have.property('answers').that.eql(
        [
          Object.assign({}, sampleAnswers.data, { refId: sampleAnswers.ref }),
        ]
      );
    });
  });
});
