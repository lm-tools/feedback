const _ = require('lodash');
class OptionsWithLabels {

  constructor(surveyDefinition) {
    this.options = _.mapValues(surveyDefinition.options, values =>
      values.map(option => ({ name: option, label: surveyDefinition.labels[option] }))
    );
  }
}

module.exports = OptionsWithLabels;
