const helper = require('./support/integrationSpecHelper');
const surveyPage = helper.surveyPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const commonTest = require('./common-survey-tests');

describe('Choose your activities survey', () => {
  const theType = 'cya';
  const theRef = '12345';
  const OTHER_REASON_PANEL = '[data-test-id="other-reason-panel"]';

  function aBaseAnswersWith(additionalFields) {
    return Object.assign({}, {
      agentFeedback: '',
      claimantFeedback: '',
      reasonOtherReason: '',
    }, additionalFields);
  }

  beforeEach(() => dbHelper.cleanDb().then(() =>
    surveyPage.visit(theType, theRef)));

  describe('common', () => {
    commonTest(theType, theRef, 'cya-1', aBaseAnswersWith({}),
      { reason: 'Why did you set this to-do for the claimant?' });
  });

  describe('render', () => {
    const expectedSurveyQuestions = [
      'Why did you set this to-do for the claimant?',
      'Was the claimant able to use the tool without support?',
      'Did the claimant start any of the activities before your next meeting?',
      'At your review meeting with the claimant following their using the tool did you:',
      'After using this tool, has the claimant changed how they search or prepare for work?',
      'What feedback has the claimant given you about this tool?',
      'What feedback would you like to give about this tool?',
      'Please rate choose your activities',
    ];

    it('should render all survey questions', () => {
      expect(surveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
    });

    it('should hide "Other reason" by default', () =>
      expect(surveyPage.isElementHidden(OTHER_REASON_PANEL)).to.eql(true)
    );

    it('should show "Other reason" when "Other" answer clicked', () => {
      surveyPage.fillRadios({ reason: 'reasonOther' });
      return expect(surveyPage.isElementHidden(OTHER_REASON_PANEL)).to.eql(false);
    });
  });

  describe('save', () => {
    ['reasonStart', 'reasonTooNarrow', 'reasonStuck', 'reasonOther'].forEach(answer => {
      it(`should save "Why did you set this" answer "${answer}" to database'`, () => {
        surveyPage.fillRadios({ reason: answer });
        return surveyPage.submit()
          .then(() => dbHelper.fetchFirstAnswersModelFromDB())
          .then(result =>
            expect(result.data).to.eql(aBaseAnswersWith(
              {
                reason: answer,
              }
            ))
          );
      });
    });

    it('should save reason other answer', () => {
      surveyPage.fillRadios({ reason: 'reasonOther' });
      surveyPage.fillTextArea('reasonOtherAnswer', 'Some other reason');

      return surveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              reason: 'reasonOther',
              reasonOtherReason: 'Some other reason',
            }
          ))
        );
    });

    [
      { noSupport: 'yes' },
      { alreadyStarted: 'no' },
      { claimantChange: 'yes' },
    ].forEach(s => {
      it(`should save "${Object.keys(s)[0]}" answer`, () => {
        surveyPage.fillRadios(s);
        return surveyPage.submit()
          .then(() => dbHelper.fetchFirstAnswersModelFromDB())
          .then(result =>
            expect(result.data).to.eql(aBaseAnswersWith(s))
          );
      });
    });

    it('should save review meeting lessons learned answers', () => {
      const allReviewAnswers = [
        'reviewMeetingClaimantNeeds',
        'reviewMeetingNextStepsDiscussion',
        'reviewMeetingCommitmentActivities',
      ];

      surveyPage.fillCheckboxes(allReviewAnswers);

      return surveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              reviewMeeting: allReviewAnswers,
            }
          ))
        );
    });

    [
      { claimantFeedback: 'Value for text area claimantFeedback' },
      { agentFeedback: 'Value for text area agentFeedback' },
    ].forEach(s => {
      const key = Object.keys(s)[0];

      it(`should save "${key}" to database`, () => {
        surveyPage.fillTextArea(key, s[key]);
        return surveyPage.submit()
          .then(() => dbHelper.fetchFirstAnswersModelFromDB())
          .then(result =>
            expect(result.data).to.eql(aBaseAnswersWith(s))
          );
      });
    });


    it('should save "Agent rating" to database', () => {
      surveyPage.fillRadios({ rating: 2 });
      return surveyPage.submit()
        .then(() => dbHelper.fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ rating: '2' }))
        );
    });
  });
});
