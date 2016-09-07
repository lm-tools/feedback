const express = require('express');
const router = new express.Router();
const AnswersModel = require('../models/answers-model');
const SurveyModel = require('../models/survey-model');
const i18n = require('i18n');
const OptionsWithLabels = require('./options-with-labels');
/* eslint-disable no-underscore-dangle */

router.get('/:type/:ref', (req, res) => {
  new AnswersModel({ ref: req.params.ref, survey: req.params.type })
    .fetch()
    .then(model => {
      if (model) {
        res.redirect(
          `${req.app.locals.basePath}/${req.params.type}/${req.params.ref}/error/already-given`
        );
      }
      new SurveyModel({ type: req.params.type })
        .fetch()
        .then(survey => {
          const options = new OptionsWithLabels(survey.get('definition')).options;

          res.render('survey', {
            pageId: 'survey',
            labels: survey.get('definition').labels,
            options,
          });
        });
    });
});

router.get('/:type/:ref/error/:errorKey', (req, res) => {
  res.render('error', {
    pageId: 'error-page',
    message: i18n.__(`error.${req.params.errorKey}`),
  });
});


router.post('/:type/:ref', (req, res, next) =>
  new AnswersModel({ ref: req.params.ref, survey: req.params.type, data: req.body }).save()
    .then(() => res.redirect(`${req.app.locals.basePath}/confirmation`))
    .catch((err) => next(err))
);

module.exports = router;
