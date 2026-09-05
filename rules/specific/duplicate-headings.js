import noDuplicates from '../abstract/no-duplicates.js'

export default noDuplicates.bind(
  this, 'headings', 'The heading "%s" is used more than once.', 'warn'
)
