import camelToDashCase from '../utils/camelToDashCase'
import capitalizeString from '../utils/capitalizeString'

export default function calc(pluginInterface) {
  const { property, value, browserInfo, prefix, keepUnprefixed, forceRun, requiresPrefix } = pluginInterface
  const { browser, version } = browserInfo

  if (
    // also check for already prefixed transitions
    typeof value === 'string' && (property.toLowerCase().indexOf('transition') > -1 || property.toLowerCase().indexOf('transitionproperty') > -1)
  ) {
    const requiresPrefixDashCased = Object.keys(requiresPrefix).map(property => camelToDashCase(property))
    let newValue = value

    // only split multi values, not cubic beziers
    const multipleValues = newValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

    requiresPrefixDashCased.forEach(property => {
      multipleValues.forEach((val, index) => {
        if (val.indexOf(property) > -1) {
          let newVal = forceRun ?
            // prefix all
            [ '-webkit-', '-moz-', '-ms-' ].map(prefix => val.replace(property, prefix + property)).join(',') :
            // default
            val.replace(property, prefix.css + property)
          multipleValues[index] = newVal + (keepUnprefixed ? ',' + val : '')
        }
      })
    })
    const outputValue = multipleValues.join(',')
    if (forceRun) {
      return {
        ['Webkit' + capitalizeString(property)]: outputValue,
        ['Moz' + capitalizeString(property)]: outputValue,
        ['ms' + capitalizeString(property)]: outputValue,
        [property]: outputValue
      }
    }
    return { [ property]: outputValue }
  }
}
