/* eslint-disable quote-props, max-len */
const definition = {
  id: 'ryws-2',
  type: 'ryws',
  definition: {
    options: {
      'atGlance': ['yes', 'no', 'notSure'],
      'usefulSummary': ['yes', 'no', 'notSure'],
      'agentInToolOrJournal': ['tool', 'journal', 'notSure'],
      'claimantInToolOrJournal': ['tool', 'journal', 'notSure'],
      'wasItHelpful': ['1', '2', '3', '4', '5'],
    },
    labels: {
      'atGlance': 'Does the job list give you an at-a-glance overview of all the claimant’s applications?',
      'usefulSummary': 'Does the timeline give a useful summary of a claimant’s work search?',
      'agentInToolOrJournal': 'Do you prefer to review a claimant’s work search in the tool or in the journal?',
      'agentInToolOrJournalWhy': 'Why?',
      'claimantInToolOrJournal': 'Does the claimant prefer to record their work search in the tool or in the journal?',
      'wasItHelpful': 'How much did this tool help you and the claimant have a better work search review?',
      'otherInformation': 'Do you have any other feedback about this tool?',
      'yes': 'Yes',
      'no': 'No',
      'notSure': 'Not sure',
      'tool': 'Tool',
      'journal': 'Journal',
      '1': 'Made review much worse',
      '2': 'Made review slightly worse',
      '3': 'No difference',
      '4': 'Made review a bit better',
      '5': 'Made review much better',
    },
  },
};

exports.definition = definition;

exports.up = (knex) => knex('survey').insert(
  Object.assign(definition,
    {
      created_at: new Date(),
      updated_at: new Date(),
    })
);

exports.down = (knex) => knex('survey').where('id', definition.id).del();

