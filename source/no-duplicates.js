var Immutable = require('immutable');

module.exports =
  function(singular, plural, messageFormat, form, values, analysis) {
    var hash = analysis.get(plural);
    return hash.reduce(function(errors, paths, key) {
      if (paths.count() > 1) {
        var error = Immutable.Map({
          object: Immutable.Map(),
          message: messageFormat.replace('%s', key),
          paths: paths
        })
          .setIn(['object', singular], key);
        return errors.push(error);
      } else {
        return errors;
      }
    }, Immutable.List());
  };
