/* @flow */
import hyphenateProperty from 'css-in-js-utils/lib/hyphenateProperty'
import isPrefixedValue from 'css-in-js-utils/lib/isPrefixedValue'

import capitalizeString from '../../utils/capitalizeString'

const properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true,
}

const prefixMapping = {
  Webkit: '-webkit-',
  Moz: '-moz-',
  ms: '-ms-',
}

function prefixValue(value: string, propertyPrefixMap: Object): string {
  if (isPrefixedValue(value)) {
    return value
  }

  // only split multi values, not cubic beziers
  const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

  for (let i = 0, len = multipleValues.length; i < len; ++i) {
    const singleValue = multipleValues[i]
    const values = [singleValue]
    for (const property in propertyPrefixMap) {
      const dashCaseProperty = hyphenateProperty(property)

      if (
        singleValue.indexOf(dashCaseProperty) > -1 &&
        dashCaseProperty !== 'order'
      ) {
        const prefixes = propertyPrefixMap[property]
        for (let j = 0, pLen = prefixes.length; j < pLen; ++j) {
          // join all prefixes and create a new value
          values.unshift(
            singleValue.replace(
              dashCaseProperty,
              prefixMapping[prefixes[j]] + dashCaseProperty
            )
          )
        }
      }
    }

    multipleValues[i] = values.join(',')
  }

  return multipleValues.join(',')
}

export default function transition(
  property: string,
  value: any,
  style: Object,
  propertyPrefixMap: Object
): ?string {
  // also check for already prefixed transitions
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    const outputValue = prefixValue(value, propertyPrefixMap)
    // if the property is already prefixed
    const webkitOutput = outputValue
      .split(/,(?![^()]*(?:\([^()]*\))?\))/g)
      .filter(val => !/-moz-|-ms-/.test(val))
      .join(',')

    if (property.indexOf('Webkit') > -1) {
      return webkitOutput
    }

    const mozOutput = outputValue
      .split(/,(?![^()]*(?:\([^()]*\))?\))/g)
      .filter(val => !/-webkit-|-ms-/.test(val))
      .join(',')

    if (property.indexOf('Moz') > -1) {
      return mozOutput
    }

    style[`Webkit${capitalizeString(property)}`] = webkitOutput
    style[`Moz${capitalizeString(property)}`] = mozOutput
    return outputValue
  }
}
