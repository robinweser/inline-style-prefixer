/* @flow */
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

const prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-'
}

function prefixValue(value: string): string {
  if (isPrefixedValue(value)) {
    return value
  }

  // only split multi values, not cubic beziers
  const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

  for (let i = 0, len = multipleValues.length; i < len; ++i) {
    const singleValue = multipleValues[i]
    const values = [singleValue]
    for (const property in prefixProps) {
      const dashCaseProperty = hyphenateStyleName(property)

      if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
        const prefixes = prefixProps[property]
        for (let j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(
            singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty)
          )
        }
      }
    }

    multipleValues[i] = values.join(',')
  }

  return multipleValues.join(',')
}

export default function transition(property: string, value: any, style: Object): ?string {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties[property]) {
    const outputValue = prefixValue(value)
    const webkitOutput = outputValue
      .split(/,(?![^()]*(?:\([^()]*\))?\))/g)
      .filter(val => val.match(/-moz-|-ms-/) === null)
      .join(',')

    // if the property is already prefixed
    if (property.indexOf('Webkit') > -1) {
      return webkitOutput
    }
    style[`Webkit${capitalizeString(property)}`] = webkitOutput
    return outputValue
  }
}
