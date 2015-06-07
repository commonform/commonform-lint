var lint = require('..');

require('tape')('no broken references', function(test) {
  var message = 'The heading "Indemnity" is referenced, but not used.';

  test.deepEqual(
    lint({content: [{reference: 'Indemnity'}]}),
    [{
      message: message,
      path: ['content', 0],
      source: 'commonform-lint',
      url: null}],
    'reports references to an unused heading');

  test.deepEqual(
    lint({
      content: [
        {reference: 'Indemnity'},
        {reference: 'Indemnity'}]}),
    [
      {
        message: message,
        path: ['content', 0],
        source: 'commonform-lint',
        url: null},
      {
        message: message,
        path: ['content', 1],
        source: 'commonform-lint',
        url: null}],
  'reports multiple references to an unused heading');

  test.end();
});
