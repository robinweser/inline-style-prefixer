/* @flow */
import prefixProperty from '../utils/prefixProperty'
import prefixValue from '../utils/prefixValue'

import addNewValuesOnly from '../utils/addNewValuesOnly'
import isObject from '../utils/isObject'

import prefixProperties from './prefixProps'

import calc from './plugins/calc'
import cursor from './plugins/cursor'
import flex from './plugins/flex'
import flexboxIE from './plugins/flexboxIE'
import flexboxOld from './plugins/flexboxOld'
import gradient from './plugins/gradient'
import position from './plugins/position'
import sizing from './plugins/sizing'
import transition from './plugins/transition'

const plugins = [
  position,
  calc,
  cursor,
  sizing,
  gradient,
  transition,
  flexboxIE,
  flexboxOld,
  flex
]

export default function prefixAll(style: Object): Object {
  for (const property in style) {
    const value = style[property]

    // handle nested objects
    if (isObject(value)) {
      style[property] = prefixAll(value)
      // handle array values
    } else if (Array.isArray(value)) {
      const combinedValue = []

      for (let i = 0, len = value.length; i < len; ++i) {
        const processedValue = prefixValue(plugins, property, value[i], style)
        addNewValuesOnly(combinedValue, processedValue || value[i])
      }

      // only modify the value if it was touched
      // by any plugin to prevent unnecessary mutations
      if (combinedValue.length > 0) {
        style[property] = combinedValue
      }
    } else {
      const processedValue = prefixValue(plugins, property, value, style)

      // only modify the value if it was touched
      // by any plugin to prevent unnecessary mutations
      if (processedValue) {
        style[property] = processedValue
      }

      prefixProperty(prefixProperties, property, style)
    }
  }

  return style
}
