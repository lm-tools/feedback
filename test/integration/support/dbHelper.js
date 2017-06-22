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
  createAnswersInDb(answers, howMany = 1) {
    const promiseList = [];

    for (let i = 0; i < howMany; i++) {
      promiseList.push(knex('answers').insert(answers));
    }
    return Promise.all(promiseList);
  },

};
