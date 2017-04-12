var analyze = require('commonform-analyze')

var rules = [
  require('./rules/specific/broken-references'),
  require('./rules/specific/duplicate-definitions'),
  require('./rules/specific/duplicate-headings'),
  require('./rules/specific/undefined-terms'),
  require('./rules/specific/unused-terms'),
  require('./rules/specific/terms-used-once'),
  require('./rules/specific/unmarked-terms'),
  require('./rules/specific/unmarked-references'),
  require('./rules/specific/overlapping-terms')
]

module.exports = function (form) {
  var analysis = analyze(form)
  return rules.reduce(function (annotations, rule) {
    return annotations
      .concat(
        rule(form, analysis).map(function (annotation) {
          annotation.source = 'commonform-lint'
          annotation.url = null
          return annotation
        })
      )
  }, [])
}
