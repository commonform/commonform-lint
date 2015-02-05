module.exports = function(project, precomputed) {
  var uses = precomputed.namespaces.uses;
  var definitions = precomputed.namespaces.definitions;
  return Object.keys(uses)
    .reduce(function(errors, term) {
      var paths = uses[term];
      if (!definitions.hasOwnProperty(term)) {
        return errors.concat({
          info: {term: term},
          paths: paths
        });
      } else {
        return errors;
      }
    }, []);
};
