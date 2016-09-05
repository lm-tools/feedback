# Api

Application expose api endpoints in order to fetch gathered answers for the survey questions.

## Authentication

Api requires `access_token` to be present in order to allow access, i.e.

    $ curl http://localhost/api/survey/:id?access_token=<some_secret_access_token>

## GET /api/survey/:surveyId

Retrieves:

* `answers` - all the answers for given survey
* `options` - predefined answers for some of the questions, if the `answer` doesn't exist here,
it's a free text field
* `labels` - all the copy for `options` and `answers` keys

Request:

    $ curl http://localhost/api/survey/ewycd_1?access_token=<some_secret_access_token>

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
