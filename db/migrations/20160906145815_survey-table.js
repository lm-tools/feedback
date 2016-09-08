exports.up = (knex) =>
  knex.schema.createTable('survey', (table) => {
    table.string('id').primary();
    table.string('type');
    table.json('definition');
    table.timestamps();
  });

exports.down = (knex) => knex.schema.dropTable('survey');
