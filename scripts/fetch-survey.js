#!/usr/bin/env node
/* eslint-disable no-console */
const program = require('commander');
const moment = require('moment');
const SurveyModel = require('../app/models/survey-model');
let surveyId;
program
  .arguments('<surveyId>')
  .action(id => {
    surveyId = id;
  })
  .parse(process.argv);


if (typeof surveyId === 'undefined') {
  console.error('no surveyId given');
  process.exit(1);
}


new SurveyModel({ id: surveyId }).fetch({ withRelated: ['answers'] })
  .then(result => {
    const surveyDefinition = result.get('definition');
    const answers = result.related('answers').serialize();

    const output = JSON.stringify({
      labels: surveyDefinition.labels,
      options: surveyDefinition.options,
      answers: answers.map(answer =>
        Object.assign({}, answer.data, { refId: answer.ref },
          { createdAt: moment(answer.created_at).format('YYYY-MM-DD HH:mm:ss') })),
    });

    console.log(output);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

