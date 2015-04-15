/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var message = 'The heading "Indemnity" is referenced, but never used.';

describe('no broken references', function() {
  it('reports reference to an unused heading', function() {
    var form = {content: [{reference: 'Indemnity'}]};
    expect(lint(form))
      .to.eql([{
        rule: 'No Broken References',
        message: message,
        object: {heading: 'Indemnity'},
        paths: [
          ['content', 0]]}]);
  });

  it('reports multiple references to an unused heading', function() {
    var form = {
      content: [
        {reference: 'Indemnity'},
        {reference: 'Indemnity'}]};
    expect(lint(form))
      .to.eql([{
        rule: 'No Broken References',
        message: message,
        object: {heading: 'Indemnity'},
        paths: [
          ['content', 0],
          ['content', 1]]}]);
  });
});
