module.exports =
  function(from, to, by, messageFormat, form, values, analysis) {
    var referenceMap = analysis[from];
    var targetMap = analysis[to];
    return Object.keys(referenceMap).reduce(function(errors, key) {
      if (!targetMap.hasOwnProperty(key)) {
        var error = {
          object: {},
          message: messageFormat.replace('%s', key),
          paths: referenceMap[key]
        };
        error.object[by] = key;
        errors.push(error);
      }
      return errors;
    }, []);
  };
