const db = require('../db');

module.exports = db.Model.extend(
  {
    tableName: 'survey',
    hasTimestamps: true,
  }
);
