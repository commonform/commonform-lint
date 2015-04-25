/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

describe('no undefined terms', function() {
  it('reports the use of an undefined term', function() {
    expect(
      lint({content: [{use: 'Agreement'}]}))
      .to.eql([{
        message: 'The term "Agreement" is used, but not defined.',
        path: ['content', 0],
        source: 'commonform-lint',
        url: null
      }]);
  });

  it('reports multiple uses of an undefined term', function() {
    var form = {
      content: [
        {use: 'Agreement'},
        {use: 'Agreement'}
      ]
    };
    expect(
      lint(form))
      .to.eql([
        {
          message: 'The term "Agreement" is used, but not defined.',
          path: ['content', 0],
          source: 'commonform-lint',
          url: null
        },
        {
          message: 'The term "Agreement" is used, but not defined.',
          path: ['content', 1],
          source: 'commonform-lint',
          url: null
        }
      ]);
  });
});
