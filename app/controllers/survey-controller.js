const express = require('express');
const router = new express.Router();
const AnswersModel = require('../models/answers-model');

router.get('/', (req, res) => {
  res.render('survey', {});
});

router.get('/:type/:ref', (req, res) => {
  res.render('survey', { ref: req.params.ref, type: req.params.type });
});

router.post('/:type/:ref', (req, res, next) =>
  new AnswersModel({ survey: 'first-survey', data: req.body }).save()
    .then((answers) => res.send(answers.serialize()))
    .catch((err) => next(err))
);

module.exports = router;
