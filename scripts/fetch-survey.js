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
    console.log(JSON.stringify({
      labels: result.get('definition').labels,
    }));
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

