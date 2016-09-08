const OptionsWithLabels = require('../../app/controllers/options-with-labels');
const expect = require('chai').expect;

describe('OptionsWithLabels', () => {
  it('should enhance options with labels', () => {
    const optionsWithLabels = new OptionsWithLabels(
      {
        options: {
          field1: ['yes', 'no'],
        },
        labels: {
          yes: 'LabelYes',
          no: 'LabelNo',
        },
      }
    );
    expect(optionsWithLabels.options).to.eql({
      field1: [
        { name: 'field1', value: 'yes', label: 'LabelYes' },
        { name: 'field1', value: 'no', label: 'LabelNo' },
      ],
    });
  });
});
