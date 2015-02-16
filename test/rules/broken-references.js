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

var message = 'The summary "Indemnity" is referenced, but never used.';

describe('no broken references', function() {
  it('reports reference to an unused summary', function() {
    expect(lint(testProject([{reference: 'Indemnity'}])))
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
    expect(lint(testProject([
      {reference: 'Indemnity'},
      {reference: 'Indemnity'}
    ])))
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