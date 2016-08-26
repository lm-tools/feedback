const knex = require('../app/db').knex;

knex.schema.raw("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public';")
  .then(tableNamesResult => {
    const tableNames = tableNamesResult.rows.map(it => it.tablename);
    knex.raw(`DROP TABLE IF EXISTS ${tableNames.join(',')} CASCADE`).then(() => {
      // eslint-disable-next-line
      console.log('Success');
      process.exit(0);
    });
  })
  .catch(err => {
    throw err;
  });
