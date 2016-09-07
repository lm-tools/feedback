exports.up = (knex) =>
  knex.schema.table('answers', (table) => {
    table.string('survey_id').references('survey.id');
  });

exports.down = (knex) => knex.schema.table('answers', (table) => {
  table.dropColumn('survey_id');
});
