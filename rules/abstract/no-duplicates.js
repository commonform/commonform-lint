export default function (plural, messageFormat, level, form, analysis) {
  const hash = analysis[plural]
  return Object.keys(hash).reduce(function (errors, key) {
    const paths = hash[key]
    if (paths.length > 1) {
      paths.forEach(function (path) {
        errors.push({
          level,
          message: messageFormat.replace('%s', key),
          path
        })
      })
    }
    return errors
  }, [])
}
