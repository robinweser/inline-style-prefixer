import hyphenateStyleName from 'hyphenate-style-name'
import capitalizeString from '../../utils/capitalizeString'
import isPrefixedValue from '../../utils/isPrefixedValue'
import prefixProps from '../prefixProps'

const properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true
}

export default function transition(property, value) {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties[property]) {
    const outputValue = prefixValue(value)
    const webkitOutput = outputValue.split(',').filter(value => value.match(/-moz-|-ms-/) === null).join(',')

    // if the property is already prefixed
    if (property.indexOf('Webkit') > -1) {
      return { [ property]: webkitOutput }
    }

    return {
      ['Webkit' + capitalizeString(property)]: webkitOutput,
      [property]: outputValue
    }
  }
}

function prefixValue(value) {
  if (isPrefixedValue(value)) {
    return value
  }

  // only split multi values, not cubic beziers
  const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

  // iterate each single value and check for transitioned properties
  // that need to be prefixed as well
  multipleValues.forEach((val, index) => {
    multipleValues[index] = Object.keys(prefixProps).reduce((out, prefix) => {
      const dashCasePrefix = '-' + prefix.toLowerCase() + '-'

      Object.keys(prefixProps[prefix]).forEach(prop => {
        const dashCaseProperty = hyphenateStyleName(prop)

        if (val.indexOf(dashCaseProperty) > -1) {
          // join all prefixes and create a new value
          out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out
        }
      })
      return out
    }, val)
  })

  return multipleValues.join(',')
}
