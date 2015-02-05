var validate = require('commonform-validate');

var namespaces = function recurse(form, result, path) {
  var definitions = result.definitions;
  form.content.forEach(function(element, index) {
    var newPath;
    if (validate.definition(element)) {
      newPath = path.concat('content', index);
      var term = element.definition;
      if (definitions.hasOwnProperty(term)) {
        definitions[term].push(newPath);
      } else {
        definitions[term] = [newPath];
      }
    } else if (validate.nestedSubForm(element)) {
      newPath = path.concat('content', index, 'form');
      recurse(element.form, result, newPath);
    }
  });
  return result;
};

module.exports = function(project) {
  var empty = {
    definitions: {}
  };
  return namespaces(project.form, empty, []);
};
