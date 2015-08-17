module.exports =
  function(from, to, messageFormat, form, analysis) {
    var referenceMap = analysis[from]
    var targetMap = analysis[to]
    return Object.keys(referenceMap)
      .reduce(function(errors, key) {
        if (!targetMap.hasOwnProperty(key)) {
          referenceMap[key]
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
