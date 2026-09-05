import noDuplicates from '../abstract/no-duplicates.js'

export default noDuplicates.bind(
  this, 'definitions', 'The term "%s" is defined more than once.',
  'error'
)
