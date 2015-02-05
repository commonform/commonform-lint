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
    var elementPath;
    var term;
    if (validate.definition(element)) {
      elementPath = path.concat('content', index);
      term = element.definition;
      pushToKeyList(result, 'definitions', term, elementPath);
    } else if (validate.use(element)) {
      elementPath = path.concat('content', index);
      term = element.use;
      pushToKeyList(result, 'uses', term, elementPath);
    } else if (validate.nestedSubForm(element)) {
      elementPath = path.concat('content', index);
      if (element.hasOwnProperty('summary')) {
        var summary = element.summary;
        pushToKeyList(result, 'summaries', summary, elementPath);
      }
      var contentPath = elementPath.concat('form');
      recurse(element.form, result, contentPath);
    }
  });
  return result;
};

module.exports = function(project) {
  var empty = {
    definitions: {},
    uses: {},
    summaries: {}
  };
  return namespaces(project.form, empty, []);
};
