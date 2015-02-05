/* jshint mocha: true */
var expect = require('chai').expect;
var precompute = require('../../source/precomputations/namespaces');

var testProject = function(content, values) {
  return {
    commonform: '0.0.0',
    metadata: {title: 'Test'},
    preferences: {},
    values: values || {},
    form: {content: content}
  };
};

describe('namespaces precomputation', function() {
  it('is a function', function() {
    expect(precompute)
      .to.be.a('function');
  });

  it('produces an object', function() {
    expect(precompute(testProject(['test'])))
      .to.be.an('object');
  });

  describe('of definitions', function() {
    it('produces an object', function() {
      expect(precompute(testProject(['test'])).definitions)
        .to.be.an('object');
    });

    it('reports term definitions', function() {
      expect(precompute(testProject([
        {definition: 'Agreement'}
      ])).definitions)
        .to.eql({Agreement: [['content', 0]]});
    });

    it('reports nested definitions', function() {
      expect(precompute(testProject([
        {definition: 'Agreement'},
        {form: {content: [{definition: 'Termination'}]}}
      ])).definitions)
        .to.eql({
          Agreement: [['content', 0]],
          Termination: [['content', 1, 'form', 'content', 0]]
        });
    });

    it('reports multiple paths for >1 definitions', function() {
      expect(precompute(testProject([
        {definition: 'Agreement'},
        {definition: 'Agreement'}
      ])).definitions)
        .to.eql({
          Agreement: [
            ['content', 0],
            ['content', 1]
          ]
        });
    });
  });

  describe('of term uses', function() {
    it('produces an object', function() {
      expect(precompute(testProject(['test'])).uses)
        .to.be.an('object');
    });

    it('reports term uses', function() {
      expect(precompute(testProject([{use: 'Agreement'}])).uses)
        .to.eql({Agreement: [['content', 0]]});
    });

    it('reports nested uses', function() {
      expect(precompute(testProject([
        {use: 'Agreement'},
        {form: {content: [{use: 'Termination'}]}}
      ])).uses)
        .to.eql({
          Agreement: [['content', 0]],
          Termination: [['content', 1, 'form', 'content', 0]]
        });
    });

    it('reports multiple paths for >1 uses', function() {
      expect(precompute(testProject([
        {use: 'Agreement'},
        {use: 'Agreement'}
      ])).uses)
        .to.eql({
          Agreement: [
            ['content', 0],
            ['content', 1]
          ]
        });
    });
  });
});
