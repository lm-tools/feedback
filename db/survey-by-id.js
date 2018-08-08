const moment = require('moment');
const SurveyModel = require('../app/models/survey-model');

module.exports = surveyId => new SurveyModel({ id: surveyId }).fetch({ withRelated: ['answers'] })
  .then(result => {
    if (!result) {
      throw new Error(`No data found for surveyId: ${surveyId}`);
    }
    const surveyDefinition = result.get('definition');
    const answers = result.related('answers').serialize();
    return {
      labels: surveyDefinition.labels,
      options: surveyDefinition.options,
      answers: answers.map(answer =>
        Object.assign({}, answer.data, { refId: answer.ref },
          { createdAt: moment(answer.created_at).format('YYYY-MM-DD HH:mm:ss') })),
    };
  });
