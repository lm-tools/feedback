const _ = require('lodash');
class OptionsWithLabels {

  constructor(surveyDefinition) {
    this.options = _.mapValues(surveyDefinition.options, (values, field) =>
      values.map(option => ({ name: field, value: option, label: surveyDefinition.labels[option] }))
    );
  }
}

module.exports = OptionsWithLabels;
