module.exports = require('../abstract/no-duplicates').bind(
  this, 'definitions', 'The term "%s" is defined more than once.',
  'error')
