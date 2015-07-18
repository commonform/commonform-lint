var lint = require('..');

require('tape')('no unused terms', function(test) {
  test.deepEqual(
    lint({
      content: [
        {definition: 'Agreement'}]}),
    [
      {
        message: 'The term "Agreement" is defined, but not used.',
        path: ['content', 0],
        source: 'commonform-lint',
        url: null}],
    'reports the use of an unused term');

  test.end();
});
