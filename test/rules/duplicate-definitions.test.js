/* jshint mocha: true */
var Immutable = require('immutable');
var expect = require('chai').expect;
var lint = require('../..');

var emptyMap = Immutable.Map();
var noValues = emptyMap;
var preferences = Immutable.fromJS({
  only: ['No Duplicate Definitions']
});

describe('no duplicate definitions rule', function() {
  it('ignores terms defined only once', function() {
    expect(lint(
      Immutable.fromJS({
        content: [
          {definition: 'Agreement'},
          {definition: 'Consideration'}
        ]
      }),
      noValues,
      preferences
    ).toJS())
      .to.eql([]);
  });

  it('reports more than one definitions of a term', function() {
    expect(lint(
      Immutable.fromJS({
        content: [
          {definition: 'Agreement'},
          {definition: 'Agreement'},
          {definition: 'Consideration'}
        ]
      }),
      noValues,
      preferences
    ).toJS())
      .to.include({
        rule: 'No Duplicate Definitions',
        message: 'The term "Agreement" is defined more than once.',
        object: {term: 'Agreement'},
        paths: [
          ['content', 0],
          ['content', 1]
        ]
      });
  });
});
