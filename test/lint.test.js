/* jshint mocha: true */
var expect = require('chai').expect;
var merge = require('util-merge');
var lint = require('..');

var validForm = {content: ['test']};

var validProject = {
  commonform: '0.0.1',
  metadata: {title: 'Test'},
  values: {},
  preferences: {},
  form: validForm
};

describe('lint', function() {
  it('is a function', function() {
    expect(lint)
      .to.be.a('function');
  });

  it('throws an error for an invalid project', function() {
    expect(function() {
      lint({});
    })
      .to.throw('Invalid project');
  });

  it('returns no errors when all rules are disabled', function() {
    expect(lint(merge(validProject, {
      preferences: {
        lint: {only: []}
      }
    })))
      .to.eql([]);
  });

  it('returns no errors for a clean project', function() {
    expect(lint(merge(validProject, {
      form: {
        content: [
          {summary: 'Summary', form: validForm},
          {reference: 'Summary'},
          {definition: 'Term'},
          {use: 'Term'}
        ]
      }
    })).length)
      .to.equal(0);
  });

  describe('rule selection', function() {
    it('throw an error for unknown rule in .only', function() {
      expect(function() {
        lint(merge(validProject, {
          preferences: {
            lint: {only: ['Fake Rule']}
          }
        }));
      })
        .to.throw('Unknown rule, "Fake Rule"');
    });

    describe('without preferences', function() {
      it('applies all rules', function() {
        expect(lint(merge(validProject, {
          form: {
            content: [
              {reference: 'Nonexistent'},
              {use: 'Nonexistent'},
              {definition: 'Twice'},
              {definition: 'Twice'},
              {summary: 'Twice', form: validForm},
              {summary: 'Twice', form: validForm},
            ]
          }
        })).length)
          .to.equal(4);
      });
    });
  });
});
