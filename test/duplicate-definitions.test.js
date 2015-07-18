var lint = require('..');

require('tape')('no duplicate definitions rule', function(test) {
  test.deepEqual(
    lint({
      content: [
        {definition: 'Agreement'},
        {definition: 'Consideration'},
        {use: 'Agreement'},
        {use: 'Consideration'}]}),
    [],
    'ignores terms defined only once');

  test.deepEqual(
    lint({
      content: [
        {definition: 'Agreement'},
        {definition: 'Agreement'},
        {definition: 'Consideration'},
        {use: 'Agreement'},
        {use: 'Consideration'}]}),
    [
      {
        message: 'The term "Agreement" is defined more than once.',
        path: ['content', 0],
        source: 'commonform-lint',
        url: null},
      {
        message: 'The term "Agreement" is defined more than once.',
        path: ['content', 1],
        source: 'commonform-lint',
        url: null}],
    'reports more than one definitions of a term');

  test.end();
});
