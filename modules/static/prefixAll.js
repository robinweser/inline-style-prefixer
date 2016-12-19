import capitalizeString from '../utils/capitalizeString'
import prefixProperties from './prefixProps'

import position from './plugins/position'
import calc from './plugins/calc'
import cursor from './plugins/cursor'
import flex from './plugins/flex'
import sizing from './plugins/sizing'
import gradient from './plugins/gradient'
import transition from './plugins/transition'
// special flexbox specifications
import flexboxIE from './plugins/flexboxIE'
import flexboxOld from './plugins/flexboxOld'

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

function runPluginsOnValue(property, value, style, callback) {
  let callbackCalled = false

  for (let i = 0, len = plugins.length; i < len; ++i) {
    const newValue = plugins[i](property, value, style)

    if (newValue) {
      callbackCalled = true
      callback(newValue)
    }
  }

  return callbackCalled
}


export default function prefixAll(style) {
  for (let property in style) {
    const value = style[property]
    if (value instanceof Object && !Array.isArray(value)) {
      style[property] = prefixAll(value)
    } else {
      if (Array.isArray(value)) {
        const combinedValue = [ ]

        for (let i = 0, len = value.length; i < len; ++i) {
          const called = runPluginsOnValue(property, value[i], style, newValue => {
            [ ].concat(newValue).forEach(val => {
              if (combinedValue.indexOf(val) === -1) {
                combinedValue.push(val)
              }
            })
          })

          if (!called && combinedValue.indexOf(value[i]) === -1) {
            combinedValue.push(value[i])
          }
        }

        style[property] = combinedValue
      } else {
        runPluginsOnValue(property, value, style, newValue => {
          style[property] = newValue
        })
      }

      const requiredPrefixes = prefixProperties[property]
      if (requiredPrefixes) {
        for (let i = 0, len = requiredPrefixes.length; i < len; ++i) {
          style[requiredPrefixes[i] + capitalizeString(property)] = style[property]
        }
      }
    }
  }

  return style
}
