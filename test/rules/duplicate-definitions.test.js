/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var testProject = function(content) {
  return {
    commonform: '0.0.0',
    metadata: {title: 'Test'},
    preferences: {
      lint: {'No Duplicate Definitions': 'true'}
    },
    values: {},
    form: {content: content}
  };
};

describe('no duplicate definitions rule', function() {
  it('reports more than one definitions of a term', function() {
    expect(lint(testProject([
      {definition: 'Agreement'},
      {definition: 'Agreement'},
      {definition: 'Consideration'}
    ])))
      .to.include({
        rule: 'No Duplicate Definitions',
        info: {term: 'Agreement'},
        paths: [
          ['content', 0],
          ['content', 1]
        ]
      });
  });
});
