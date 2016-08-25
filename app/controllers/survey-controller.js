const express = require('express');
const router = new express.Router();
const AnswersModel = require('../models/answers-model');

router.get('/', (req, res) => {
  res.render('survey', {});
});

router.post('/', (req, res, next) =>
  new AnswersModel({ survey: 'first-survey', data: req.body }).save()
    .then((answers) => res.send(answers.serialize()))
    .catch((err) => next(err))
);

module.exports = router;
