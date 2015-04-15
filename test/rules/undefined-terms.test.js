/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

describe('no undefined terms', function() {
  it('reports the use of an undefined term', function() {
    expect(
      lint({content: [{use: 'Agreement'}]}))
      .to.eql([{
        rule: 'No Undefined Terms',
        message: 'The term "Agreement" is used, but not defined.',
        object: {term: 'Agreement'},
        paths: [
          ['content', 0]]}]);
  });

  it('reports multiple uses of an undefined term', function() {
    var form = {
      content: [
        {use: 'Agreement'},
        {use: 'Agreement'}]};
    expect(
      lint(form))
      .to.eql([{
        rule: 'No Undefined Terms',
        message: 'The term "Agreement" is used, but not defined.',
        object: {term: 'Agreement'},
        paths: [
          ['content', 0],
          ['content', 1]]}]);
  });
});
