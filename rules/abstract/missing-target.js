export default function (from, to, messageFormat, level, form, analysis) {
  const referenceMap = analysis[from]
  const targetMap = analysis[to]
  return Object.keys(referenceMap).reduce(
    function (errors, key) {
      if (!Object.hasOwn(targetMap, key)) {
        referenceMap[key].forEach(function (path) {
          errors.push({
            message: messageFormat.replace('%s', key),
            level,
            path
          })
        })
      }
      return errors
    }, [])
}
