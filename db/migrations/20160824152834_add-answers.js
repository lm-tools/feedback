exports.up = (knex) =>
  knex.schema.createTable('answers', (table) => {
    table.increments('id').primary();
    table.string('survey');
    table.json('data');
    table.timestamps();
  });

exports.down = (knex) => knex.schema.dropTable('answers');
