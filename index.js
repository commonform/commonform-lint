var valid = require('commonform-validate');

var rules = {
  'No Duplicate Definitions':
    require('./source/rules/duplicate-definitions'),
  'No Undefined Terms':
    require('./source/rules/undefined-terms'),
  'No Duplicate Summaries':
    require('./source/rules/duplicate-summaries')
};

var precomputeNamespaces =
  require('./source/precomputations/namespaces');

module.exports = function(project) {
  if (!valid.project(project)) {
    throw new Error('Invalid project');
  }

  var prefs = project.preferences;

  var rulesToApply = Object.keys(rules)
    // Collect a list of rules to apply.
    .reduce(function(rulesToApply, name) {
      if (!prefs.hasOwnProperty(name) || prefs[name] !== 'false') {
        return rulesToApply.concat({
          name: name,
          errorsIn: rules[name]
        });
      } else {
        return rulesToApply;
      }
    }, []);

  if (rulesToApply.length < 1) {
    return [];
  } else {
    // Precompute certain useful data structures describing the project.
    var precomputed = {
      namespaces: precomputeNamespaces(project)
    };

    // Apply each rule to the project, concatenating errors.
    return rulesToApply.reduce(function(errors, rule) {
      return errors.concat(
        rule.errorsIn(project, precomputed)
          .map(function(error) {
            error.rule = rule.name;
            return error;
          })
      );
    }, []);
  }
};

module.exports.version = '0.0.1';
