var analyze = require('commonform-analyze');

var name = require('../package.json').name;

var rules = [
  require('./rules/broken-references'),
  require('./rules/duplicate-definitions'),
  require('./rules/duplicate-headings'),
  require('./rules/undefined-terms')
];

module.exports = function(form) {
  var analysis = analyze(form);
  return rules
    .reduce(function(annotations, rule) {
      return annotations
        .concat(
          rule(form, analysis)
            .map(function(annotation) {
              annotation.source = name;
              annotation.url = null;
              return annotation;
            })
        );
    }, []);
};
