import missingTarget from '../abstract/missing-target.js'

export default missingTarget.bind(
  this, 'uses', 'definitions',
  'The term "%s" is used, but not defined.',
  'error'
)
