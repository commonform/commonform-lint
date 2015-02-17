/* jshint mocha: true */
var Immutable = require('immutable');
var expect = require('chai').expect;
var lint = require('../..');

var emptyMap = Immutable.Map();
var noValues = emptyMap;
var preferences = Immutable.fromJS({
  only: ['No Undefined Terms']
});

describe('no undefined terms', function() {
  it('reports the use of an undefined term', function() {
    expect(lint(
      Immutable.fromJS({content: [{use: 'Agreement'}]}),
      noValues,
      preferences
    ).toJS())
      .to.eql([{
        rule: 'No Undefined Terms',
        message: 'The term "Agreement" is used, but not defined.',
        object: {term: 'Agreement'},
        paths: [
          ['content', 0]
        ]
      }]);
  });

  it('reports multiple uses of an undefined term', function() {
    expect(lint(
      Immutable.fromJS({
        content: [
          {use: 'Agreement'},
          {use: 'Agreement'}
        ]
      }),
      noValues,
      preferences
    ).toJS())
      .to.eql([{
        rule: 'No Undefined Terms',
        message: 'The term "Agreement" is used, but not defined.',
        object: {term: 'Agreement'},
        paths: [
          ['content', 0],
          ['content', 1]
        ]
      }]);
  });
});
