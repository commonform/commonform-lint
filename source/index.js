var Immutable = require('immutable');
var analyze = require('commonform-analyze');

var availableRules = Immutable.Map({
  'No Duplicate Definitions':
    require('./rules/duplicate-definitions'),
  'No Duplicate Summaries':
    require('./rules/duplicate-summaries'),
  'No Undefined Terms':
    require('./rules/undefined-terms'),
  'No Broken References':
    require('./rules/broken-references')
});

var unknownRuleError = function(name) {
  return new Error('Unknown rule, "' + name + '"');
};

var emptyList = Immutable.List();

module.exports = function(form, values, preferences) {
  var rulesToApply;

  if (preferences.has('only')) {
    rulesToApply = preferences.get('only').map(function(name) {
      if (availableRules.has(name)) {
        return Immutable.Map({
          name: name,
          ruleFunction: availableRules.get(name)
        });
      } else {
        throw unknownRuleError(name);
      }
    });
  } else {
    rulesToApply = availableRules.map(function(check, name) {
      return Immutable.Map({
        name: name,
        ruleFunction: check
      });
    });
  }

  if (rulesToApply.count() < 1) {
    return emptyList;
  } else {
    var analysis = analyze(form);

    // Apply each rule to the project, concatenating errors.
    return rulesToApply.reduce(function(errors, rule) {
      return errors.concat(
        rule.get('ruleFunction')(form, values, analysis)
          .map(function(error) {
            return error.set('rule', rule.get('name'));
          })
      );
    }, emptyList);
  }
};

module.exports.version = '0.3.0';
