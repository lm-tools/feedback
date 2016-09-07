/* eslint-disable quote-props, max-len */
const childProcess = require('child_process');
const path = require('path');
const fetchSurveyScript = path.join(__dirname, '..', '..', 'scripts/fetch-survey.js');
const expect = require('chai').expect;

describe('Fetch survey script', () => {
  describe('executing "scripts/fetch-survey.js ewycd-1"', () => {
    let result;
    before(() => {
      result = childProcess.spawnSync(fetchSurveyScript, ['ewycd-1']);
    });

    it('should execute without error', () => {
      expect(result.status).to.eql(0);
    });

    it('should return labels for all the questions', () => {
      expect(JSON.parse(result.stdout)).to.have.property('labels').that.include.keys(
        [
          'whyTypes',
          'whyTypes-start-goals',
          'whyTypes-broaden-goals',
          'whyTypes-transferable-skills',
          'whyTypes-update-cv',
          'whyTypes-search-terms',
          'whyTypes-other',
          'whyTypes-other-reason',
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

    it.skip('should return predefined options', () => {
      expect(JSON.parse(result.stdout)).to.have.property('options').that.eql(
        {
          'whyTypes': [
            'whyTypes-start-goals',
            'whyTypes-broaden-goals',
            'whyTypes-transferable-skills',
            'whyTypes-update-cv',
            'whyTypes-search-terms',
            'whyTypes-other',
          ],
          'startGoalsHelped': [
            'yes',
            'no',
          ],
          'otherHelped': [
            'yes',
            'no',
          ],
        }
      );
    });
  });
});
