const helper = require('./support/integrationSpecHelper');
const ewycdSurveyPage = helper.ewycdSurveyPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const commonTest = require('./common-survey-tests');

describe('Record your work search survey', () => {
  const theType = 'ryws';
  const theRef = '12345';

  function aBaseAnswersWith(additionalFields) {
    return Object.assign({}, {
      agentFeedback: '',
      claimantFeedback: '',
      otherInformation: '',
    }, additionalFields);
  }

  beforeEach(() => dbHelper.cleanDb().then(() =>
    ewycdSurveyPage.visit(theType, theRef)));

  describe('common', () => {
    commonTest(theType, theRef, 'ryws-1', aBaseAnswersWith({}), { whatExtent: 'Latest copy ryws' });
  });

  describe('render', () => {
    const expectedSurveyQuestions = [
      'Does the job application tracker collect the job application information you need?',
      'By itself, does the job application tracker tell you what job application ' +
      'activity your claimant has done?',
      'Would you feel prepared for the work search review if you only used the information f' +
      'rom the job application tracker?',
      'Did the job application tracker help focus the conversation with your claimant?',
      'Is the information from the job application tracker enough to identify actions or advice ' +
      'for claimants on what to do next?',
      'What other information would you like to see?',
      'What feedback have you received from claimants using the tracker?',
      'What other feedback would you like to give us?',
    ];

    it('should render all survey questions', () => {
      expect(ewycdSurveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
    });
  });

  describe('save', () => {
    ['whatExtentDidnt', 'whatExtentUsed', 'whatExtentQuite', 'whatExtentVery'].forEach(answer => {
      it(`should save "WhatExtent" answer "${answer}" to database'`, () => {
        ewycdSurveyPage.fillRadios({ whatExtent: answer });
        return ewycdSurveyPage.submit()
          .then(() => dbHelper.fetchFirstAnswersModelFromDB())
          .then(result =>
            expect(result.data).to.eql(aBaseAnswersWith(
              {
                whatExtent: answer,
              }
            ))
          );
      });
    });

    [
      { captureApplication: 'yes' },
      { understandActivity: 'no' },
      { feelPrepared: 'yes' },
      { providedEnough: 'no' },
    ].forEach(s => {
      it(`should save "${Object.keys(s)[0]}" answer`, () => {
        ewycdSurveyPage.fillRadios(s);
        return ewycdSurveyPage.submit()
          .then(() => dbHelper.fetchFirstAnswersModelFromDB())
          .then(result =>
            expect(result.data).to.eql(aBaseAnswersWith(s))
          );
      });
    });

    [
      { otherInformation: 'Value for text area otherInformation' },
      { claimantFeedback: 'Value for text area claimantFeedback' },
      { agentFeedback: 'Value for text area agentFeedback' },
    ].forEach(s => {
      const key = Object.keys(s)[0];

      it(`should save "${key}" to database`, () => {
        ewycdSurveyPage.fillTextArea(key, s[key]);
        return ewycdSurveyPage.submit()
          .then(() => dbHelper.fetchFirstAnswersModelFromDB())
          .then(result =>
            expect(result.data).to.eql(aBaseAnswersWith(s))
          );
      });
    });


    it('should save "Agent rating" to database', () => {
      ewycdSurveyPage.fillRadios({ rating: 2 });
      return ewycdSurveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ rating: '2' }))
        );
    });
  });
});
