const knexCleaner = require('knex-cleaner');
const knex = require('../../../app/db').knex;

module.exports = {
  cleanDb() {
    return knexCleaner.clean(knex, { ignoreTables: ['knex_migrations', 'survey'] });
  },
};
