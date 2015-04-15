/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('..');

var validForm = {content: ['test']};

describe('lint', function() {
  it('is a function', function() {
    expect(lint).to.be.a('function');
  });

  it('returns no errors for a clean project', function() {
    var form = {
      content: [
        {heading: 'Heading', form: validForm},
        {reference: 'Heading'},
        {definition: 'Term'},
        {use: 'Term'}]};
    expect(lint(form).length).to.equal(0);
  });
});
