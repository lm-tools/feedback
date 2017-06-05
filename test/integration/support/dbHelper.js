const knexCleaner = require('knex-cleaner');
const knex = require('../../../app/db').knex;
const AnswersModel = require('../../../app/models/answers-model');

module.exports = {
  cleanDb() {
    return knexCleaner.clean(knex, { ignoreTables: ['knex_migrations', 'survey'] });
  },

  fetchFirstAnswersModelFromDB() {
    return AnswersModel.fetchAll().then(results => results.serialize()[0]);
  },
  createAnswersInDb(answers) {
    return knex('answers').insert(answers);
  },

};
