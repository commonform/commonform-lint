/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var testProject = function(content) {
  return {
    commonform: '0.0.0',
    metadata: {title: 'Test'},
    preferences: {
      lint: {only:['No Undefined Terms']}
    },
    values: {},
    form: {content: content}
  };
};

describe('no undefined terms', function() {
  it('reports the use of an undefined term', function() {
    expect(lint(testProject([{use: 'Agreement'}])))
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
    expect(lint(testProject([
      {use: 'Agreement'},
      {use: 'Agreement'}
    ])))
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
