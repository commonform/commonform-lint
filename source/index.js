var analyze = require('commonform-analyze');
var validate = require('commonform-validate');

var rules = {
  'No Duplicate Definitions':
    require('./rules/duplicate-definitions'),
  'No Duplicate Summaries':
    require('./rules/duplicate-summaries'),
  'No Undefined Terms':
    require('./rules/undefined-terms'),
  'No Broken References':
    require('./rules/broken-references')
};

var unknownRuleError = function(name) {
  return new Error('Unknown rule, "' + name + '"');
};

module.exports = function(project) {
  if (!validate.project(project)) {
    throw new Error('Invalid project');
  }

  var prefs = project.preferences.lint || {};
  var rulesToApply;

  if (prefs.hasOwnProperty('only')) {
    rulesToApply = prefs.only.map(function(name) {
      if (rules.hasOwnProperty(name)) {
        return {
          name: name,
          errorsIn: rules[name]
        };
      } else {
        throw unknownRuleError(name);
      }
    });
  } else {
    rulesToApply = Object.keys(rules).map(function(name) {
      return {
        name: name,
        errorsIn: rules[name]
      };
    });
  }

  if (rulesToApply.length < 1) {
    return [];
  } else {
    var analysis = analyze(project);

    // Apply each rule to the project, concatenating errors.
    return rulesToApply.reduce(function(errors, rule) {
      return errors.concat(
        rule.errorsIn(project, analysis)
          .map(function(error) {
            error.rule = rule.name;
            return error;
          })
      );
    }, []);
  }
};

module.exports.version = '0.0.1';
