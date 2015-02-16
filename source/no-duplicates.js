module.exports = function(singular, plural, fmt, project, analysis) {
  var hash = analysis[plural];
  return Object.keys(hash)
    .reduce(function(errors, key) {
      var paths = hash[key];
      if (paths.length > 1) {
        var error = {
          object: {},
          message: fmt.replace('%s', key),
          paths: paths
        };
        error.object[singular] = key;
        return errors.concat(error);
      } else {
        return errors;
      }
    }, []);
};
