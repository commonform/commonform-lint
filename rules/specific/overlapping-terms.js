module.exports = function (form, analysis) {
  var terms = Object.keys(analysis.definitions)
  return terms.reduce(function (annotations, containing) {
    return terms.reduce(function (annotations, contained) {
      var overlapping = (
        contained !== containing &&
        containing.indexOf(contained) !== -1
      )
      if (overlapping) {
        return annotations.concat(
          analysis.definitions[containing].map(function (path) {
            return {
              level: 'info',
              message: (
                'The term "' + containing +
                '" contains the term "' + contained + '".'
              ),
              path: path
            }
          })
        )
      } else {
        return annotations
      }
    }, annotations)
  }, [])
}
