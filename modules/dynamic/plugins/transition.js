/* @flow */
import hyphenateProperty from 'css-in-js-utils/lib/hyphenateProperty'
import type { PluginMetaData } from '../../../flowtypes/PluginMetaData'

const properties = {
  transition: true,
  transitionProperty: true,
  WebkitTransition: true,
  WebkitTransitionProperty: true,
  MozTransition: true,
  MozTransitionProperty: true,
}

let requiresPrefixDashCased: Array<string>

export default function transition(
  property: string,
  value: any,
  style: Object,
  { cssPrefix, keepUnprefixed, requiresPrefix }: PluginMetaData
): ?Array<any> | ?any {
  if (typeof value === 'string' && properties.hasOwnProperty(property)) {
    // memoize the prefix array for later use
    if (!requiresPrefixDashCased) {
      requiresPrefixDashCased = Object.keys(requiresPrefix).map(prop =>
        hyphenateProperty(prop)
      )
    }

    // only split multi values, not cubic beziers
    const multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g)

    requiresPrefixDashCased.forEach(prop => {
      multipleValues.forEach((val, index) => {
        if (val.indexOf(prop) > -1 && prop !== 'order') {
          multipleValues[index] =
            val.replace(prop, cssPrefix + prop) +
            (keepUnprefixed ? `,${val}` : '')
        }
      })
    })

    return multipleValues.join(',')
  }
}
