var validate = require('commonform-validate');

var definitionsIn = function(form, result, path) {
  form.content.forEach(function(element, index) {
    var newPath;
    if (validate.definition(element)) {
      newPath = path.concat('content', index);
      var term = element.definition;
      if (result.hasOwnProperty(term)) {
        result[term].push(newPath);
      } else {
        result[term] = [newPath];
      }
    } else if (validate.nestedSubForm(element)) {
      newPath = path.concat('content', index, 'form');
      definitionsIn(element.form, result, newPath);
    }
  });
  return result;
};

module.exports = function(project) {
  return definitionsIn(project.form, {}, []);
};
