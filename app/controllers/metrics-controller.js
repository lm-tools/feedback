const express = require('express');
const router = new express.Router({ mergeParams: true });
const surveyById = require('./../../db/survey-by-id');

router.get('/:surveyId', (req, res) =>
  surveyById(req.params.surveyId)
    .then(surveyResult => res.status(200).send(surveyResult))
    .catch(e => {
      if (/^No data found for surveyId: .*$/.test(e.message)) {
        res.status(400).send(e.message);
      } else {
        throw e;
      }
    })
);

module.exports = router;
