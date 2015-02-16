/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var testProject = function(content) {
  return {
    commonform: '0.0.0',
    metadata: {title: 'Test'},
    preferences: {
      lint: {only: ['No Duplicate Definitions']}
    },
    values: {},
    form: {content: content}
  };
};

describe('no duplicate definitions rule', function() {
  it('ignores terms defined only once', function() {
    expect(lint(testProject([
      {definition: 'Agreement'},
      {definition: 'Consideration'}
    ])))
      .to.eql([]);
  });

  it('reports more than one definitions of a term', function() {
    expect(lint(testProject([
      {definition: 'Agreement'},
      {definition: 'Agreement'},
      {definition: 'Consideration'}
    ])))
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
