var has = require('has')

module.exports =
function (from, to, messageFormat, level, form, analysis) {
  var referenceMap = analysis[from]
  var targetMap = analysis[to]
  return Object.keys(referenceMap).reduce(
    function (errors, key) {
      if (!has(targetMap, key)) {
        referenceMap[key].forEach(function (path) {
          errors.push({
            message: messageFormat.replace('%s', key),
            level: level,
            path: path
          })
        })
      }
      return errors
    }, [])
}
