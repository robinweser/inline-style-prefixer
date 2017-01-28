/* @flow */
import hyphenateStyleName from 'hyphenate-style-name'

import unprefixProperty from '../../utils/unprefixProperty'

import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const properties = {
  transition: true,
  transitionProperty: true
}

let requiresPrefixDashCased: Array<string>

export default function transition(
  property: string,
  value: any,
  style: Object,
  { cssPrefix, keepUnprefixed, requiresPrefix }: PluginMetaData
): ?Array<any> | ?any {
  // also check for already prefixed transitions
  const unprefixedProperty = unprefixProperty(property)

  if (typeof value === 'string' && properties[unprefixedProperty]) {
    // memoize the prefix array for later use
    if (!requiresPrefixDashCased) {
      requiresPrefixDashCased = Object.keys(requiresPrefix).map(prop => hyphenateStyleName(prop))
    }

    // only split multi values, not cubic beziers
    const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

    requiresPrefixDashCased.forEach((prop) => {
      multipleValues.forEach((val, index) => {
        if (val.indexOf(prop) > -1 && prop !== 'order') {
          multipleValues[index] = val.replace(prop, cssPrefix + prop) +
            (keepUnprefixed ? `,${val}` : '')
        }
      })
    })

    return multipleValues.join(',')
  }
}
