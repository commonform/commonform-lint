var analyze = require('commonform-analyze')

var name = require('./package.json').name

var rules = [
  require('./rules/specific/broken-references'),
  require('./rules/specific/duplicate-definitions'),
  require('./rules/specific/duplicate-headings'),
  require('./rules/specific/undefined-terms'),
  require('./rules/specific/unused-terms') ]

module.exports = function(form) {
  var analysis = analyze(form)
  return rules
    .reduce(
      function(annotations, rule) {
        return annotations
          .concat(
            rule(form, analysis)
              .map(function(annotation) {
                annotation.source = name
                annotation.url = null
                return annotation })) },
      []) }
