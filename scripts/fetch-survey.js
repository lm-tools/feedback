#!/usr/bin/env node
/* eslint-disable no-console */
const program = require('commander');
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


new SurveyModel({ id: surveyId }).fetch()
  .then(result => {
    const surveyDefinition = result.get('definition');
    console.log(JSON.stringify({
      labels: surveyDefinition.labels,
      options: surveyDefinition.options,
    }));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

