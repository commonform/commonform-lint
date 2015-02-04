/* jshint mocha: true */
var expect = require('chai').expect;
var precompute = require('../../source/precomputations/definitions');

var testProject = function(content, values) {
  return {
    commonform: '0.0.0',
    metadata: {title: 'Test'},
    preferences: {},
    values: values || {},
    form: {content: content}
  };
};

describe('definitions precomputation', function() {
  it('is a function', function() {
    expect(precompute)
      .to.be.a('function');
  });

  it('produces an object', function() {
    expect(precompute(testProject(['test'])))
      .to.be.an('object');
  });

  it('reports term definitions', function() {
    expect(precompute(testProject([
      {definition: 'Agreement'}
    ])))
      .to.eql({Agreement: [['content', 0]]});
  });

  it('reports nested definitions', function() {
    expect(precompute(testProject([
      {definition: 'Agreement'},
      {form: {content: [{definition: 'Termination'}]}}
    ])))
      .to.eql({
        Agreement: [['content', 0]],
        Termination: [['content', 1, 'form', 'content', 0]]
      });
  });

  it('reports multiple paths for >1 definitions', function() {
    expect(precompute(testProject([
      {definition: 'Agreement'},
      {definition: 'Agreement'}
    ])))
      .to.eql({
        Agreement: [
          ['content', 0],
          ['content', 1]
        ]
      });
  });
});
