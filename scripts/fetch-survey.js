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
  // adding a second argument to terminate process allows the write to complete before process exits
  .then(surveyResult => process.stdout.write(JSON.stringify(surveyResult), () => process.exit(0)))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
