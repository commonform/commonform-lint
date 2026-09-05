import missingTarget from '../abstract/missing-target.js'

export default missingTarget.bind(
  this, 'references', 'headings',
  'The heading "%s" is referenced, but not used.',
  'error'
)
