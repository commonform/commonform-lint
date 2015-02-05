module.exports = function(project, precomputed) {
  var definitions = precomputed.namespaces.definitions;
  return Object.keys(definitions)
    .reduce(function(errors, term) {
      var paths = definitions[term];
      if (paths.length > 1) {
        return errors.concat({
          info: {term: term},
          paths: paths
        });
      } else {
        return errors;
      }
    }, []);
};
