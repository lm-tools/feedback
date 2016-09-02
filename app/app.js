const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('./../logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const surveyController = require('./controllers/survey-controller');
const confirmationController = require('./controllers/confirmation-controller');
const i18nMiddleware = require('./middleware/i18n');
const i18n = require('i18n');
const healthCheckController = require('./controllers/health-check-controller');

const app = express();
i18nMiddleware(app);

// view engine setup
const cons = require('consolidate');
app.engine('mustache', cons.hogan);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// run the whole application in a directory
const basePath = app.locals.basePath = process.env.EXPRESS_BASE_PATH || '';
const assetPath = `${basePath}/`;
const googleTagManagerId = process.env.GOOGLE_TAG_MANAGER_ID;

app.use('/health_check', healthCheckController);
app.use(`${basePath}/health_check`, healthCheckController);

// Middleware to set default layouts.
// This must be done per request (and not via app.locals) as the Consolidate.js
// renderer mutates locals.partials :(
app.use((req, res, next) => {
  // eslint-disable-next-line no-param-reassign
  Object.assign(res.locals, {
    assetPath,
    basePath,
    googleTagManagerId,
    partials: {
      layout: 'layouts/main',
      govukTemplate:
        '../../vendor/govuk_template_mustache_inheritance/views/layouts/govuk_template',
      googleTagManager: 'partials/google-tag-manager',
    },
  });
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '..',
  'vendor', 'govuk_template_mustache_inheritance', 'assets', 'images', 'favicon.ico')));

// Configure logging
app.use(logger.init(app.get('env')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(assetPath, express.static(path.join(__dirname, '..', 'dist', 'public')));
app.use(assetPath, express.static(path.join(__dirname, '..',
  'vendor', 'govuk_template_mustache_inheritance', 'assets')));


app.use(`${basePath}/`, surveyController);
app.use(`${basePath}/confirmation`, confirmationController);

if (app.get('env') === 'development' || app.get('env') === 'test') {
  // eslint-disable-next-line global-require
  app.use(`${basePath}/test/error`, require('./controllers/test-controller'));
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }
  const status = err.status || 500;
  res.status(status);
  const model = { message: i18n.__(`error.${status}`), pageId: 'error-page' };
  if (app.get('env') === 'development') {
    model.error = err;
  }
  res.render('error', model);
});


module.exports = app;
