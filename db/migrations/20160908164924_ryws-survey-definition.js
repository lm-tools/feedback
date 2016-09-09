/* eslint-disable quote-props, max-len */
exports.up = (knex) =>
  knex('survey').insert(
    {
      id: 'ryws-1',
      type: 'ryws',
      definition: {
        options: {
          'whatExtent': [
            'whatExtentDidnt',
            'whatExtentUsed',
            'whatExtentQuite',
            'whatExtentVery',
          ],
          'captureApplication': ['yes', 'no'],
          'understandActivity': ['yes', 'no'],
          'feelPrepared': ['yes', 'no'],
          'providedEnough': ['yes', 'no'],
          'otherInformation': ['yes', 'no'],
          'agentFeedback': ['yes', 'no'],
          'rating': ['5', '4', '3', '2', '1'],
        },
        labels: {
          'whatExtent': 'To what extent does the job application tracker help focus the conversation with your claimant?',
          'whatExtentDidnt': 'I didn\'t use it',
          'whatExtentUsed': 'I used it but it didn\'t help',
          'whatExtentQuite': 'It was quite helpful',
          'whatExtentVery': 'It was very helpful',
          'yes': 'Yes',
          'no': 'No',
          'captureApplication': 'Does the job application tracker capture the job application information you need?',
          'understandActivity': 'Does the job application tracker by itself allow you to understand what job application activity your claimant has done?',
          'feelPrepared': 'Do you feel prepared for the work search review using only the information on the job application tracker?',
          'providedEnough': 'Is the information provided by the job application tracker enough to identify actions or advice for claimants on what to do next?',
          'otherInformation': 'What other information would you like to see?',
          'claimantFeedback': 'What feedback have you received from claimants using the tool?',
          'agentFeedback': 'What other feedback would you like to give us?',
          'rating': 'Please rate Record your work search',
        },
      },
      created_at: new Date(),
      updated_at: new Date(),
    }
  );

exports.down = (knex) => knex('survey').where('id', 'ryws-1').del();

