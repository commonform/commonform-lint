/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var testProject = function(content) {
  return {
    commonform: '0.0.0',
    metadata: {title: 'Test'},
    preferences: {
      lint: {'No Undefined Terms': 'true'}
    },
    values: {},
    form: {content: content}
  };
};

describe('no undefined terms', function() {
  it('repoorts the use of an undefined term', function() {
    expect(lint(testProject([{use: 'Agreement'}])))
      .to.eql([{
        rule: 'No Undefined Terms',
        info: {term: 'Agreement'},
        paths: [
          ['content', 0]
        ]
      }]);
  });

  it('repoorts multiple uses of an undefined term', function() {
    expect(lint(testProject([
      {use: 'Agreement'},
      {use: 'Agreement'}
    ])))
      .to.eql([{
        rule: 'No Undefined Terms',
        info: {term: 'Agreement'},
        paths: [
          ['content', 0],
          ['content', 1]
        ]
      }]);
  });
});
