const express = require('express');
const router = new express.Router();
const AnswersModel = require('../models/answers-model');

router.get('/:type/:ref', (req, res) => {
  res.render('survey', { ref: req.params.ref, type: req.params.type, pageId: 'survey' });
});

router.post('/:type/:ref', (req, res, next) =>
  new AnswersModel({ survey: 'first-survey', data: req.body }).save()
    .then(() => res.redirect(`${req.app.locals.basePath}/confirmation`))
    .catch((err) => next(err))
);

module.exports = router;
