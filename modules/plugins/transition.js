import hyphenateStyleName from 'hyphenate-style-name'
import unprefixProperty from '../utils/unprefixProperty'

const properties = { transition: true, transitionProperty: true }

export default function transition({ property, value, prefix: { css }, requiresPrefix, keepUnprefixed }) {
  // also check for already prefixed transitions
  const unprefixedProperty = unprefixProperty(property)

  if (typeof value === 'string' && properties[unprefixedProperty]) {
    // TODO: memoize this array
    const requiresPrefixDashCased = Object.keys(requiresPrefix).map(prop => hyphenateStyleName(prop))

    // only split multi values, not cubic beziers
    const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

    requiresPrefixDashCased.forEach(prop => {
      multipleValues.forEach((val, index) => {
        if (val.indexOf(prop) > -1 && prop !== 'order') {
          multipleValues[index] = val.replace(prop, css + prop) + (keepUnprefixed ? ',' + val : '')
        }
      })
    })

    return { [ property]: multipleValues.join(',') }
  }
}
