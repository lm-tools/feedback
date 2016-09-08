const helper = require('./support/integrationSpecHelper');
const ewycdSurveyPage = helper.ewycdSurveyPage;
const confirmationPage = helper.confirmationPage;
const errorPage = helper.errorPage;
const globalPage = helper.globalPage;
const dbHelper = helper.dbHelper;
const expect = require('chai').expect;
const AnswersModel = require('../../app/models/answers-model');
const SurveyModel = require('../../app/models/survey-model');

describe('Explore work you could do survey', () => {
  const theType = 'ewycd';
  const theRef = '12345';

  function fetchFirstAnswersModelFromDB() {
    return AnswersModel.fetchAll().then(results => results.serialize()[0]);
  }

  function aBaseAnswersWith(additionalFields) {
    return Object.assign({}, {
      whyTypesOtherReason: '',
      claimantFeedback: '',
      agentFeedback: '',
    }, additionalFields);
  }

  beforeEach(() => dbHelper.cleanDb().then(() =>
    ewycdSurveyPage.visit(theType, theRef)));

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
      expect(ewycdSurveyPage.getQuestionValues()).to.eql(expectedSurveyQuestions);
    });

    [
      {
        question: 'Did this helped with start goals',
        type: 'whyTypesStartGoals',
        selector: ewycdSurveyPage.START_GOALS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with broaden goals',
        type: 'whyTypesBroadenGoals',
        selector: ewycdSurveyPage.BROADEN_GOALS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with transferable skills',
        type: 'whyTypesTransferableSkills',
        selector: ewycdSurveyPage.TRANSFERABLE_SKILLS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with update civ',
        type: 'whyTypesUpdateCv',
        selector: ewycdSurveyPage.UPDATE_CV_PANEL_SELECTOR,
      },
      {
        question: 'Did this helped with search terms',
        type: 'whyTypesSearchTerms',
        selector: ewycdSurveyPage.SEARCH_TERMS_HELPED_PANEL,
      },
      {
        question: 'Did this helped with other thing',
        type: 'whyTypesOther',
        selector: ewycdSurveyPage.OTHER_HELPED_PANEL,
      },
    ].forEach(s => {
      it(`should hide "${s.question}" question by default`, () =>
        expect(ewycdSurveyPage.isElementHidden(s.selector)).to.eql(true)
      );

      it(`should show "${s.question}" when "${s.type}" answer clicked`, () => {
        ewycdSurveyPage.fillWhyDidYouSetThis([s.type]);
        return expect(ewycdSurveyPage.isElementHidden(s.selector)).to.eql(false);
      });
    });
    it('should hide "Other reason" by default', () =>
      expect(ewycdSurveyPage.isElementHidden(ewycdSurveyPage.OTHER_REASON_PANEL)).to.eql(true)
    );

    it('should show "Other reason" when "Other" answer clicked', () => {
      ewycdSurveyPage.fillWhyDidYouSetThis(['whyTypesOther']);
      return expect(ewycdSurveyPage.isElementHidden(ewycdSurveyPage.OTHER_REASON_PANEL))
        .to.eql(false);
    });

    it('should display error if user has already filled survey', () =>
      ewycdSurveyPage.submit()
        .then(() => ewycdSurveyPage.visit(theType, theRef))
        .then(() => {
          expect(globalPage.getPageId()).to.eql(errorPage.PAGE_ID);
          expect(errorPage.getMessage()).to.eql('You’ve already given feedback.');
        })
    );
  });

  describe('analytics', () => {
    it('should contain valid google tag manager data', () =>
      ewycdSurveyPage.visit(theType, theRef).then(() =>
        expect(globalPage.getGoogleAnalyticsUserVariable()).to.equal('set-me-in-controller')
      )
    );
  });

  describe('save', () => {
    it('should save empty form to database', () =>
      ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({}))
        )
    );

    it('should save refId and survey type', () =>
      ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result => {
          expect(result.ref).to.eql(theRef);
          expect(result.survey).to.eql(theType);
        })
    );

    it('should save survey_id', () =>
      ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result => {
          expect(result.survey_id).to.eql('ewycd-1'); // this is currently the only ewycd survey
        })
    );

    it('should save "why did you set this" section to database', () => {
      const allWhyTypesValues = [
        'whyTypesStartGoals',
        'whyTypesBroadenGoals',
        'whyTypesTransferableSkills',
        'whyTypesUpdateCv',
        'whyTypesSearchTerms',
        'whyTypesOther',
      ];
      ewycdSurveyPage.fillWhyDidYouSetThis(allWhyTypesValues);
      ewycdSurveyPage.fillOtherReason('Other reason');

      return ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              whyTypes: allWhyTypesValues,
              whyTypesOtherReason: 'Other reason',
            }
          ))
        );
    });

    it('should save "Did this help" section to database', () => {
      ewycdSurveyPage.fillRadios({
        startGoalsHelped: 'yes',
        broadenGoalsHelped: 'no',
        transferableSkillsHelped: 'yes',
        updateCvHelped: 'no',
        searchTermsHelped: 'yes',
        otherHelped: 'no',
      });
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith(
            {
              startGoalsHelped: 'yes',
              broadenGoalsHelped: 'no',
              transferableSkillsHelped: 'yes',
              updateCvHelped: 'no',
              searchTermsHelped: 'yes',
              otherHelped: 'no',
            }
          ))
        );
    });

    it('should save "Did claimant change" to database', () => {
      ewycdSurveyPage.fillRadios({ claimantChange: 'yes' });
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ claimantChange: 'yes' }))
        );
    });

    it('should save "Claimaint feedback" to database', () => {
      ewycdSurveyPage.fillTextArea('claimantFeedback', 'Some random text');
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ claimantFeedback: 'Some random text' }))
        );
    });

    it('should save "Agent feedback" to database', () => {
      ewycdSurveyPage.fillTextArea('agentFeedback', 'Some agent random text');
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ agentFeedback: 'Some agent random text' }))
        );
    });

    it('should save "Agent rating" to database', () => {
      ewycdSurveyPage.fillRadios({ rating: 3 });
      return ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result =>
          expect(result.data).to.eql(aBaseAnswersWith({ rating: '3' }))
        );
    });

    it('should show confirmation page', () =>
      ewycdSurveyPage.submit()
        .then(() => expect(globalPage.getPageId()).to.eql(confirmationPage.PAGE_ID))
    );
  });

  describe('versions', () => {
    before(() => new SurveyModel({
      id: 'latest',
      type: theType,
      definition: { labels: { whyTypes: 'Latest copy' }, options: {} },
    }).save(null, { method: 'insert' })
      .then(() => ewycdSurveyPage.visit(theType, theRef))
    );

    after(() => new AnswersModel().query({ where: { survey_id: 'latest' } }).destroy()
      .then(() => new SurveyModel({ id: 'latest' }).destroy()));

    it('should save latest survey_id', () =>
      ewycdSurveyPage.submit()
        .then(() => fetchFirstAnswersModelFromDB())
        .then(result => {
          expect(result.survey_id).to.eql('latest');
        })
    );

    it('should render latest survey', () =>
      expect(ewycdSurveyPage.getText(ewycdSurveyPage.QUESTION_WHY_TYPES)).to.eql('Latest copy')
    );
  });
});
