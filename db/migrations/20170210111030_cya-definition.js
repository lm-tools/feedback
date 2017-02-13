/* eslint-disable quote-props, max-len */
const definition = {
  id: 'cya-1',
  type: 'cya',
  definition: {
    options: {
      'reason': [
        'reasonStart',
        'reasonTooNarrow',
        'reasonStuck',
        'reasonOther',
      ],
      'noSupport': ['yes', 'no'],
      'alreadyStarted': ['yes', 'no'],
      'reviewMeeting': [
        'reviewMeetingClaimantNeeds',
        'reviewMeetingNextStepsDiscussion',
        'reviewMeetingCommitmentActivities',
      ],
      'claimantChange': ['yes', 'no'],
      'rating': ['5', '4', '3', '2', '1'],
    },
    labels: {
      'reason': 'Why did you set this to-do for the claimant?',
      'reasonStart': 'They\'re new - this will get them started on their work search',
      'reasonTooNarrow': 'They\'re not new, but their range of activities is too narrow at the moment',
      'reasonStuck': 'They\'re in a rut - they need fresh ideas for their work search',
      'reasonOther': 'Other',
      'reasonOtherReason': 'Why did you set it?',
      'yes': 'Yes',
      'no': 'No',
      'noSupport': 'Was the claimant able to use the tool without support?',
      'alreadyStarted': 'Did the claimant start any of the activities before your next meeting?',
      'reviewMeeting': 'At your review meeting with the claimant after they used the tool, did you:',
      'reviewMeetingClaimantNeeds': 'Learn more about the claimant\'s needs from their use of the tool',
      'reviewMeetingNextStepsDiscussion': 'Have a more focused discussion on next steps',
      'reviewMeetingCommitmentActivities': 'Identify activities to include in their commitments',
      'claimantChange': 'After using this tool, has the claimant changed how they search or prepare for work?',
      'claimantFeedback': 'What feedback has the claimant given you about this tool?',
      'agentFeedback': 'What feedback would you like to give about this tool?',
      'rating': 'Please rate choose your activities',
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

