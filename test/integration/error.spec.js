const helper = require('./support/integrationSpecHelper');
const errorPage = helper.errorPage;
const globalPage = helper.globalPage;
const surveyPage = helper.surveyPage;
const expect = require('chai').expect;

describe('Error page', () => {
  [
    { error: 500, message: "We're experiencing technical problems." },
    { error: 404, message: 'Page not found' },
  ].forEach(s => {
    it(`should show message "${s.message}" for ${s.error} error`, () =>
      globalPage.visit(`/test/error/${s.error}`)
        .catch(() => {
          expect(globalPage.getPageId()).to.eql(errorPage.PAGE_ID);
          expect(errorPage.getMessage()).to.eql(s.message);
        })
    );
  });

  it('should display 404 if survey not found', () =>
    surveyPage.visit('not-real', '123')
      .catch(() => {
        expect(globalPage.getPageId()).to.eql(errorPage.PAGE_ID);
        expect(errorPage.getMessage()).to.eql('Page not found');
      })
  );
});
