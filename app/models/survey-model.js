const db = require('../db');
const Answers = require('./answers-model');

module.exports = db.Model.extend(
  {
    tableName: 'survey',
    hasTimestamps: true,
    answers() {
      return this.hasMany(Answers);
    },
  }
);
