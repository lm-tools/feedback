# Data design

In order to retrieve data you need to execute `$ scripts/fetch-survey.js <surveyId>`

## Fetch survey script

Return json data:

* `answers` - all the answers for given survey
* `options` - predefined answers for some of the questions, if the `answer` doesn't exist here,
it's a free text field
* `labels` - all the copy for `options` and `answers` keys

Response:

``` json
{
    "surveyId": "ewycd-1",
    "type": "ewycd",
    "answers": [
        {
            "refId": "someRefId",
            "whyTypes": [
                "whyTypesStartGoals",
                "whyTypesOther"
            ],
            "startGoalsHelped": "yes",
            "otherHelped": "no",
            "claimantFeedback": "Claimant really liked it"
        }
    ],
    "options": {
        "whyTypes": [
            "whyTypesStartGoals",
            "whyTypesBroadenGoals",
            "whyTypesTransferableSkills",
            "whyTypesUpdateCv",
            "whyTypesSearchTerms",
            "whyTypesOther"
        ],
        "startGoalsHelped": [
            "yes",
            "no"
        ],
        "otherHelped": [
            "yes",
            "no"
        ]
    },
    "labels": {
        "whyTypes": "To get someone started on job goals",
        "whyTypesStartGoals": "To get someone started on job goals",
        "whyTypesBroadenGoals": "To broaden job goals",
        "whyTypesTransferableSkills": "To look for transferable skills",
        "whyTypesUpdateCv": "To update their CV",
        "whyTypesSearchTerms": "To look for alternative search terms for their online job search",
        "whyTypesOther": "Other",
        "yes": "Yes",
        "no": "No",
        "claimantFeedback": "What feedback has your Claimant given you about this tool?"
    }
}
```
