module.exports =
  function(singular, plural, messageFormat, form, analysis) {
    var hash = analysis[plural];
    return Object.keys(hash).reduce(function(errors, key) {
      var paths = hash[key];
      if (paths.length > 1) {
        var error = {
          object: {},
          message: messageFormat.replace('%s', key),
          paths: paths
        };
        error.object[singular] = key;
        errors.push(error);
      }
      return errors;
    }, []);
  };
