const express = require('express');
const router = new express.Router();
const AnswersModel = require('../models/answers-model');
const i18n = require('i18n');
/* eslint-disable no-underscore-dangle */

router.get('/:type/:ref', (req, res) => {
  new AnswersModel({ ref: req.params.ref, survey: req.params.type })
    .fetch()
    .then(model => {
      if (model) {
        res.redirect(
          `${req.app.locals.basePath}/${req.params.type}/${req.params.ref}/error/already-given`
        );
      } else {
        res.render('survey', { pageId: 'survey' });
      }
    });
});

router.get('/:type/:ref/error/:errorKey', (req, res) => {
  res.render('error-notification', {
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
