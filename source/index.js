var analyze = require('commonform-analyze');

var rules = {
  'No Duplicate Definitions': require('./rules/duplicate-definitions'),
  'No Duplicate Headings': require('./rules/duplicate-headings'),
  'No Undefined Terms': require('./rules/undefined-terms'),
  'No Broken References': require('./rules/broken-references')
};

module.exports = function(form) {
  var analysis = analyze(form);
  return Object.keys(rules)
    .reduce(function(errors, name) {
      var ruleFunction = rules[name];
      return errors.concat(
        ruleFunction(form, analysis)
          .map(function(error) {
            error.rule = name;
            return error;
          })
      );
    }, []);
};

module.exports.version = '0.4.0';
