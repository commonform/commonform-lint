module.exports = function(from, to, by, fmt, project, analysis) {
  var referenceMap = analysis[from];
  var targetMap = analysis[to];
  return Object.keys(referenceMap)
    .reduce(function(errors, key) {
      var paths = referenceMap[key];
      if (!targetMap.hasOwnProperty(key)) {
        var error = {
          object: {},
          message: fmt.replace('%s', key),
          paths: paths
        };
        error.object[by] = key;
        return errors.concat(error);
      } else {
        return errors;
      }
    }, []);
};
