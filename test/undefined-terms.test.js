var lint = require('..');

require('tape')('no undefined terms', function(test) {
  test.deepEqual(
    lint({
      content: [
        {use: 'Agreement'}]}),
    [
      {
        message: 'The term "Agreement" is used, but not defined.',
        path: ['content', 0],
        source: 'commonform-lint',
        url: null}],
    'reports the use of an undefined term');

  test.deepEqual(
    lint({
      content: [
        {use: 'Agreement'},
        {use: 'Agreement'}]}),
    [
      {
        message: 'The term "Agreement" is used, but not defined.',
        path: ['content', 0],
        source: 'commonform-lint',
        url: null},
      {
        message: 'The term "Agreement" is used, but not defined.',
        path: ['content', 1],
        source: 'commonform-lint',
        url: null}],
    'reports multiple uses of an undefined term');

  test.end();
});
