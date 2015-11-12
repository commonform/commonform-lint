module.exports = function(form, analysis) {
  var uses = analysis.uses
  var definitions = analysis.definitions
  return Object.keys(uses)
    .reduce(
      function(errors, key) {
        var paths = uses[key]
        var usedJustOnce = (
          paths.length === 1 &&
          definitions.hasOwnProperty(key) )
        if (usedJustOnce) {
          errors.push({
            message: (
              'The defined term ' +
              '"' + key + '" ' +
              'is used only once.' ),
            level: 'info',
            path: paths[0] }) }
        return errors },
      [ ]) }
