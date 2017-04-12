module.exports = function (form, analysis) {
  var definitions = Object.keys(analysis.definitions)
    .map(function (term) {
      return {
        term: term,
        expression: new RegExp('\\b' + term + '\\b')
      }
    })
  return recurse(form, [], definitions)
}

var MESSAGE_FORMAT = (
  'The term "%s" is used, ' +
  'but not marked as a defined term.'
)

function recurse (form, path, definitions) {
  return form.content.reduce(function (annotations, element, index) {
    if (element.hasOwnProperty('form')) {
      return annotations.concat(
        recurse(
          element.form,
          path.concat('content', index, 'form'),
          definitions
        )
      )
    } else if (typeof element === 'string') {
      return definitions.reduce(function (annotations, definition) {
        if (definition.expression.test(element)) {
          return annotations.concat({
            message: MESSAGE_FORMAT.replace('%s', definition.term),
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
