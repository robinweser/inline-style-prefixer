import hyphenateStyleName from 'hyphenate-style-name'
import capitalizeString from '../utils/capitalizeString'
import unprefixProperty from '../utils/unprefixProperty'

const properties = { transition: true, transitionProperty: true }

export default function transition({ property, value, prefix: { css }, requiresPrefix, keepUnprefixed }) {
  // also check for already prefixed transitions
  const unprefixedProperty = unprefixProperty(property)
  if (typeof value === 'string' && properties[unprefixedProperty]) {
    const requiresPrefixDashCased = Object.keys(requiresPrefix).map(prop => hyphenateStyleName(prop))

    // only split multi values, not cubic beziers
    const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

    requiresPrefixDashCased.forEach(property => {
      multipleValues.forEach((val, index) => {
        if (val.indexOf(property) > -1) {
          multipleValues[index] = val.replace(property, css + property) + (keepUnprefixed ? ',' + val : '')
        }
      })
    })

    return { [ property]: multipleValues.join(',') }
  }
}
