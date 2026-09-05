import missingTarget from '../abstract/missing-target.js'

export default missingTarget.bind(
  this, 'definitions', 'uses',
  'The term "%s" is defined, but not used.',
  'warn'
)
