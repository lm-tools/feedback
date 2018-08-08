#!/usr/bin/env node
/* eslint-disable no-console */
const program = require('commander');
const surveyById = require('../db/survey-by-id');
let surveyId = '';

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

surveyById(surveyId)
  .then(surveyResult => process.stdout.write(surveyResult, () => process.exit(0)))
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
