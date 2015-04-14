/* jshint mocha: true */
var expect = require('chai').expect;
var lint = require('..');

var validForm = {content: ['test']};

describe('lint', function() {
  it('is a function', function() {
    expect(lint).to.be.a('function');
  });

  it('returns no errors when all rules are disabled', function() {
    expect(lint(validForm, {}, {only: []})).to.eql([]);
  });

  it('returns no errors for a clean project', function() {
    var form = {
      content: [
        {heading: 'Heading', form: validForm},
        {reference: 'Heading'},
        {definition: 'Term'},
        {use: 'Term'}]};
    expect(lint(form, {}, {}).length).to.equal(0);
  });

  describe('rule selection', function() {
    it('throw an error for unknown rule in .only', function() {
      expect(function() {
        lint(validForm, {}, {only: ['Fake Rule']});
      }).to.throw('Unknown rule, "Fake Rule"');
    });

    describe('without preferences', function() {
      it('applies all rules', function() {
        var form = {
          content: [
            {reference: 'Nonexistent'},
            {use: 'Nonexistent'},
            {definition: 'Twice'},
            {definition: 'Twice'},
            {heading: 'Twice', form: validForm},
            {heading: 'Twice', form: validForm}]};
        expect(lint(form, {}, {}).length).to.equal(4);
      });
    });
  });
});
