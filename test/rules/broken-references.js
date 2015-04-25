/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var message = 'The heading "Indemnity" is referenced, but not used.';

describe('no broken references', function() {
  it('reports reference to an unused heading', function() {
    var form = {content: [{reference: 'Indemnity'}]};
    expect(lint(form))
      .to.eql([{
        message: message,
        path: ['content', 0],
        source: 'commonform-lint',
        url: null
      }]);
  });

  it('reports multiple references to an unused heading', function() {
    var form = {
      content: [
        {reference: 'Indemnity'},
        {reference: 'Indemnity'}
      ]
    };
    expect(lint(form))
      .to.eql([
        {
          message: message,
          path: ['content', 0],
          source: 'commonform-lint',
          url: null
        },
        {
          message: message,
          path: ['content', 1],
          source: 'commonform-lint',
          url: null
        }
      ]);
  });
});
