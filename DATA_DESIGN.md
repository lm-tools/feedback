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
                "whyTypes-start-goals",
                "whyTypes-other"
            ],
            "startGoalsHelped": "yes",
            "otherHelped": "no",
            "claimantFeedback": "Claimant really liked it"
        }
    ],
    "options": {
        "whyTypes": [
            "whyTypes-start-goals",
            "whyTypes-broaden-goals",
            "whyTypes-transferable-skills",
            "whyTypes-update-cv",
            "whyTypes-search-terms",
            "whyTypes-other"
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
        "whyTypes-start-goals": "To get someone started on job goals",
        "whyTypes-broaden-goals": "To broaden job goals",
        "whyTypes-transferable-skills": "To look for transferable skills",
        "whyTypes-update-cv": "To update their CV",
        "whyTypes-search-terms": "To look for alternative search terms for their online job search",
        "whyTypes-other": "Other",
        "yes": "Yes",
        "no": "No",
        "claimantFeedback": "What feedback has your Claimant given you about this tool?"
    }
}
```
