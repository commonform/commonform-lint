/* jshint mocha: true */
var Immutable = require('immutable');
var expect = require('chai').expect;
var lint = require('..');

var validForm = Immutable.fromJS({content: ['test']});
var emptyMap = Immutable.Map();
var noPreferences = emptyMap;
var noValues = emptyMap;

describe('lint', function() {
  it('is a function', function() {
    expect(lint)
      .to.be.a('function');
  });

  it('returns no errors when all rules are disabled', function() {
    expect(lint(
      validForm,
      noValues,
      Immutable.fromJS({only: []})
    ).toJS())
      .to.eql([]);
  });

  it('returns no errors for a clean project', function() {
    expect(lint(
      Immutable.fromJS({
        content: [
          {summary: 'Summary', form: validForm},
          {reference: 'Summary'},
          {definition: 'Term'},
          {use: 'Term'}
        ]
      }),
      noValues,
      noPreferences
   ).count())
      .to.equal(0);
  });

  describe('rule selection', function() {
    it('throw an error for unknown rule in .only', function() {
      expect(function() {
        lint(
          validForm,
          noValues,
          Immutable.Map({only: ['Fake Rule']})
        );
      })
        .to.throw('Unknown rule, "Fake Rule"');
    });

    describe('without preferences', function() {
      it('applies all rules', function() {
        expect(lint(
          Immutable.fromJS({
            content: [
              {reference: 'Nonexistent'},
              {use: 'Nonexistent'},
              {definition: 'Twice'},
              {definition: 'Twice'},
              {summary: 'Twice', form: validForm},
              {summary: 'Twice', form: validForm},
            ]
          }),
          noValues,
          noPreferences
        ).count())
          .to.equal(4);
      });
    });
  });
});
