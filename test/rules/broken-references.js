/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var testProject = function(content) {
  return {
    commonform: '0.0.0',
    metadata: {title: 'Test'},
    preferences: {
      lint: {only: ['No Broken References']}
    },
    values: {},
    form: {content: content}
  };
};

describe('no broken references', function() {
  it('repoorts reference to an unused summary', function() {
    expect(lint(testProject([{reference: 'Indemnity'}])))
      .to.eql([{
        rule: 'No Broken References',
        info: {summary: 'Indemnity'},
        paths: [
          ['content', 0]
        ]
      }]);
  });

  it('repoorts multiple references to an unused summary', function() {
    expect(lint(testProject([
      {reference: 'Indemnity'},
      {reference: 'Indemnity'}
    ])))
      .to.eql([{
        rule: 'No Broken References',
        info: {summary: 'Indemnity'},
        paths: [
          ['content', 0],
          ['content', 1]
        ]
      }]);
  });
});
