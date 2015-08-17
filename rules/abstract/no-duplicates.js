module.exports =
  function(plural, messageFormat, form, analysis) {
    var hash = analysis[plural]
    return Object.keys(hash)
      .reduce(function(errors, key) {
        var paths = hash[key]
        if (paths.length > 1) {
          paths
            .forEach(function(path) {
              errors.push({
                message: messageFormat.replace('%s', key),
                path: path
              })
            })
        }
        return errors
      }, [])
  }
