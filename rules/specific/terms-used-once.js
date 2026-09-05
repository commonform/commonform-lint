export default function (form, analysis) {
  const uses = analysis.uses
  const definitions = analysis.definitions
  return Object.keys(uses).reduce(function (errors, key) {
    const paths = uses[key]
    const usedJustOnce = (
      paths.length === 1 &&
      Object.hasOwn(definitions, key)
    )
    if (usedJustOnce) {
      errors.push({
        message:
          'The defined term ' +
          '"' + key + '" ' +
          'is used only once.',
        level: 'info',
        path: paths[0]
      })
    }
    return errors
  }, [])
}
