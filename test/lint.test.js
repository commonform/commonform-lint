var lint = require('..');

require('tape')('lint', function(test) {
  test.equal(
    typeof lint,
    'function',
    'is a function');

  test.equal(
    lint({
      content: [
        {
          heading: 'Heading',
          form: {content: ['test']}},
        {reference: 'Heading'},
        {definition: 'Term'},
        {use: 'Term'}]})
      .length,
    0,
    'returns no errors for a sound form');

  test.end();
});
