/* eslint-disable quote-props, max-len */
exports.up = (knex) =>
  knex('survey').insert(
    {
      id: 'ewycd-2',
      type: 'ewycd',
      definition: {
        options: {
          'whyTypes': [
            'whyTypesStartGoals',
            'whyTypesBroadenGoals',
            'whyTypesTransferableSkills',
            'whyTypesUpdateCv',
            'whyTypesSearchTerms',
            'whyTypesOther',
          ],
          'startGoalsHelped': ['yes', 'no'],
          'broadenGoalsHelped': ['yes', 'no'],
          'transferableSkillsHelped': ['yes', 'no'],
          'updateCvHelped': ['yes', 'no'],
          'searchTermsHelped': ['yes', 'no'],
          'otherHelped': ['yes', 'no'],
          'claimantChange': ['yes', 'no'],
          'agentFeedback': ['yes', 'no'],
          'rating': ['5', '4', '3', '2', '1'],
        },
        labels: {
          'whyTypes': 'Why did you set this to-do for the claimant?',
          'whyTypesStartGoals': 'To get them started on job goals',
          'whyTypesBroadenGoals': 'To make their job goals broader',
          'whyTypesTransferableSkills': 'So that they look for transferable skills',
          'whyTypesUpdateCv': 'So that they update their CV',
          'whyTypesSearchTerms': 'So that they learn about different search terms for online job searches',
          'whyTypesOther': 'Other',
          'whyTypesOtherReason': 'Reason',
          'yes': 'Yes',
          'no': 'No',
          'startGoalsHelped': 'Did it help them get started on job goals?',
          'broadenGoalsHelped': 'Did it help them make their job goals broader?',
          'transferableSkillsHelped': 'Did it help them look for transferable skills?',
          'updateCvHelped': 'Did it help them update their CV?',
          'searchTermsHelped': 'Did it help them learn about different search terms for online job searches?',
          'otherHelped': 'Did it help them do the other thing you wanted them to do?',
          'claimantChange': 'After using this tool, has the claimant changed how they search or prepare for work?',
          'claimantFeedback': 'What feedback has the claimant given you about this tool?',
          'agentFeedback': 'What feedback would you like to give about this tool?',
          'rating': 'Please rate Explore work you could do?',
        },
      },
      created_at: new Date(),
      updated_at: new Date(),
    }
  );

exports.down = (knex) => knex('survey').where('id', 'ewycd-2').del();

