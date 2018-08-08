const healthCheck = require('./health-check-controller');
const metrics = require('./metrics-controller');
const survey = require('./survey-controller');

module.exports = {
  healthCheck,
  metrics,
  survey,
};
