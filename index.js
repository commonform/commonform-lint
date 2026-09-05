import analyze from 'commonform-analyze'

import broken from './rules/specific/broken-references.js'
import dupDef from './rules/specific/duplicate-definitions.js'
import dupHead from './rules/specific/duplicate-headings.js'
import undef from './rules/specific/undefined-terms.js'
import unused from './rules/specific/unused-terms.js'
import usedOnce from './rules/specific/terms-used-once.js'
import unmarkedTerms from './rules/specific/unmarked-terms.js'
import unmarkedReferences from './rules/specific/unmarked-references.js'

const rules = [
  broken,
  dupDef,
  dupHead,
  undef,
  unused,
  usedOnce,
  unmarkedTerms,
  unmarkedReferences
]

export default function (form) {
  const analysis = analyze(form)
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
