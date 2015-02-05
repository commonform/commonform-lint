module.exports = function(singular, plural, project, precomputed) {
  var hash = precomputed.namespaces[plural];
  return Object.keys(hash)
    .reduce(function(errors, key) {
      var paths = hash[key];
      if (paths.length > 1) {
        var error = {
          info: {},
          paths: paths
        };
        error.info[singular] = key;
        return errors.concat(error);
      } else {
        return errors;
      }
    }, []);
};
