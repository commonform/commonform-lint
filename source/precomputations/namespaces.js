var validate = require('commonform-validate');

var pushToKeyList = function(result, type, key, path) {
  var set = result[type];
  if (set.hasOwnProperty(key)) {
    set[key].push(path);
  } else {
    set[key] = [path];
  }
};

var namespaces = function recurse(form, result, path) {
  form.content.forEach(function(element, index) {
    var newPath;
    var term;
    if (validate.definition(element)) {
      newPath = path.concat('content', index);
      term = element.definition;
      pushToKeyList(result, 'definitions', term, newPath);
    } else if (validate.use(element)) {
      newPath = path.concat('content', index);
      term = element.use;
      pushToKeyList(result, 'uses', term, newPath);
    } else if (validate.nestedSubForm(element)) {
      newPath = path.concat('content', index, 'form');
      recurse(element.form, result, newPath);
    }
  });
  return result;
};

module.exports = function(project) {
  var empty = {
    definitions: {},
    uses: {}
  };
  return namespaces(project.form, empty, []);
};
