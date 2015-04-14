/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('../..');

var preferences = {only: ['No Duplicate Definitions']};

describe('no duplicate definitions rule', function() {
  it('ignores terms defined only once', function() {
    var form = {
      content: [
        {definition: 'Agreement'},
        {definition: 'Consideration'}]};
    expect(lint(form, {}, preferences))
      .to.eql([]);
  });

  it('reports more than one definitions of a term', function() {
    var form = {
      content: [
        {definition: 'Agreement'},
        {definition: 'Agreement'},
        {definition: 'Consideration'}]};
    expect(
      lint(form, {}, preferences))
      .to.include({
        rule: 'No Duplicate Definitions',
        message: 'The term "Agreement" is defined more than once.',
        object: {term: 'Agreement'},
        paths: [
          ['content', 0],
          ['content', 1]]});
  });
});
