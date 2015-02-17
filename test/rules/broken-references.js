/* jshint mocha: true */
var Immutable = require('immutable');
var expect = require('chai').expect;
var lint = require('../..');

var message = 'The summary "Indemnity" is referenced, but never used.';
var emptyMap = Immutable.Map();
var noValues = emptyMap;
var preferences = Immutable.fromJS({
  only: ['No Broken References']
});

describe('no broken references', function() {
  it('reports reference to an unused summary', function() {
    expect(lint(
      Immutable.fromJS({
        content: [{reference: 'Indemnity'}]
      }),
      noValues,
      preferences
    ).toJS())
      .to.eql([{
        rule: 'No Broken References',
        message: message,
        object: {summary: 'Indemnity'},
        paths: [
          ['content', 0]
        ]
      }]);
  });

  it('reports multiple references to an unused summary', function() {
    expect(lint(
      Immutable.fromJS({
        content: [
          {reference: 'Indemnity'},
          {reference: 'Indemnity'}
        ]
      }),
      noValues,
      preferences
    ).toJS())
      .to.eql([{
        rule: 'No Broken References',
        message: message,
        object: {summary: 'Indemnity'},
        paths: [
          ['content', 0],
          ['content', 1]
        ]
      }]);
  });
});
