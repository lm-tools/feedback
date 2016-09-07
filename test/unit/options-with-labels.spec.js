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
        { name: 'yes', label: 'LabelYes' },
        { name: 'no', label: 'LabelNo' },
      ],
    });
  });
});
