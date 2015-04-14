var analyze = require('commonform-analyze');

var availableRules = {
  'No Duplicate Definitions': require('./rules/duplicate-definitions'),
  'No Duplicate Headings': require('./rules/duplicate-headings'),
  'No Undefined Terms': require('./rules/undefined-terms'),
  'No Broken References': require('./rules/broken-references')
};

var unknownRuleError = function(name) {
  return new Error('Unknown rule, "' + name + '"');
};

module.exports = function(form, values, preferences) {
  var rulesToApply;

  if (preferences.hasOwnProperty('only')) {
    rulesToApply = preferences.only.map(function(name) {
      if (availableRules.hasOwnProperty(name)) {
        return {name: name, ruleFunction: availableRules[name]};
      } else {
        throw unknownRuleError(name);
      }
    });
  } else {
    rulesToApply = Object.keys(availableRules).map(function(name) {
      var check = availableRules[name];
      return {name: name, ruleFunction: check};
    });
  }

  if (rulesToApply.length < 1) {
    return [];
  } else {
    var analysis = analyze(form);
    // Apply each rule to the project, concatenating errors.
    return rulesToApply.reduce(function(errors, rule) {
      return errors.concat(
        rule.ruleFunction(form, values, analysis)
          .map(function(error) {
            error.rule = rule.name;
            return error;
          })
      );
    }, []);
  }
};

module.exports.version = '0.3.0';
