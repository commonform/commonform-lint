module.exports = function(from, to, by, project, precomputed) {
  var referenceMap = precomputed.namespaces[from];
  var targetMap = precomputed.namespaces[to];
  return Object.keys(referenceMap)
    .reduce(function(errors, key) {
      var paths = referenceMap[key];
      if (!targetMap.hasOwnProperty(key)) {
        var error = {
          info: {},
          paths: paths
        };
        error.info[by] = key;
        return errors.concat(error);
      } else {
        return errors;
      }
    }, []);
};
