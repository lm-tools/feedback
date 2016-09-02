class Routes {
  constructor(basePath) {
    this.basePath = basePath;
    this.confirmationPage = `${basePath}/confirmation`;
  }

  surveyErrorPage(ref, type, error) {
    return `${this.basePath}/${type}/${ref}/error/${error}`;
  }
}
module.exports = Routes;
