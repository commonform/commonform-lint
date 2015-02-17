var Immutable = require('immutable');

module.exports =
  function(from, to, by, messageFormat, form, values, analysis) {
    var referenceMap = analysis.get(from);
    var targetMap = analysis.get(to);
    return referenceMap.reduce(function(errors, paths, key) {
      if (!targetMap.has(key)) {
        var error = Immutable.Map({
          object: Immutable.Map(),
          message: messageFormat.replace('%s', key),
          paths: paths
        })
          .setIn(['object', by], key);
        return errors.push(error);
      } else {
        return errors;
      }
    }, Immutable.List());
  };
