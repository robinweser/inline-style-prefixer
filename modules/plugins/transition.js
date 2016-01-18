import camelToDashCase from '../utils/camelToDashCase'

export default function calc(pluginInterface) {
  const { property, value, browserInfo, prefix, keepUnprefixed, forceRun, requiresPrefix } = pluginInterface
  const { browser, version } = browserInfo

  if (
    // also check for already prefixed transitions
    typeof value === 'string' && (property.toLowerCase().indexOf('transition') > -1 || property.toLowerCase().indexOf('transitionproperty') > -1)
  ) {
    const requiresPrefixDashCased = Object.keys(requiresPrefix).map(property => camelToDashCase(property))
    let newValue = value

    const multipleValues = newValue.split(',')

    requiresPrefixDashCased.forEach(property => {
      multipleValues.forEach((val, index) => {
        if (val.indexOf(property) > -1) {
          multipleValues[index] = val.replace(property, prefix.css + property) + (keepUnprefixed ? ',' + val : '')
        }
      })
    })
    return { [ property]: multipleValues.join(',') }
  }
}
