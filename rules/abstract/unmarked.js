module.exports =
function (namespace, messageFormat, level, form, analysis) {
  var names = Object.keys(analysis[namespace])
    .map(function (name) {
      return {
        name: name,
        expression: new RegExp('\\b' + name + '\\b')
      }
    })
  return recurse(form, [], messageFormat, names)
}

function recurse (form, path, messageFormat, names) {
  return form.content.reduce(function (annotations, element, index) {
    if (element.hasOwnProperty('form')) {
      return annotations.concat(
        recurse(
          element.form,
          path.concat('content', index, 'form'),
          messageFormat,
          names
        )
      )
    } else if (typeof element === 'string') {
      return names.reduce(function (annotations, definition) {
        if (definition.expression.test(element)) {
          return annotations.concat({
            message: messageFormat.replace('%s', definition.name),
            level: 'info',
            path: path.concat('content', index)
          })
        } else {
          return annotations
        }
      }, annotations)
    } else {
      return annotations
    }
  }, [])
}
