/* eslint-disable quote-props, max-len */
exports.up = (knex) =>
  knex('survey').insert(
    {
      id: 'ewycd-1',
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
          'whyTypes': 'Why did you set this To-Do for the Claimant?',
          'whyTypesStartGoals': 'To get someone started on job goals',
          'whyTypesBroadenGoals': 'To broaden job goals',
          'whyTypesTransferableSkills': 'To look for transferable skills',
          'whyTypesUpdateCv': 'To update their CV',
          'whyTypesSearchTerms': 'To look for alternative search terms for their online job search',
          'whyTypesOther': 'Other',
          'whyTypesOtherReason': 'Reason',
          'yes': 'Yes',
          'no': 'No',
          'startGoalsHelped': 'Did this help the Claimant to get someone started on job goals?',
          'broadenGoalsHelped': 'Did this help the Claimant to broaden job goals?',
          'transferableSkillsHelped': 'Did this help the Claimant to look for transferable skills?',
          'updateCvHelped': 'Did this help the Claimant to update their CV?',
          'searchTermsHelped': 'Did this help the Claimant to look for alternative search terms for their online job search?',
          'otherHelped': 'Did this help the Claimant to do the other thing you wanted them to do?',
          'claimantChange': 'Has the Claimant changed how they search or prepare for work after using this tool?',
          'claimantFeedback': 'What feedback has your Claimant given you about this tool?',
          'agentFeedback': 'What feedback would you like to give about this tool?',
          'rating': 'Please rate Explore Work You Could Do?',
        },
      },
      created_at: new Date(),
      updated_at: new Date(),
    }
  );

exports.down = (knex) => knex('survey').where('id', 'ewycd-1').del();

