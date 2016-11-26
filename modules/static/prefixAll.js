import prefixProperties from './prefixProps'
import capitalizeString from '../utils/capitalizeString'

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

/**
 * Returns a prefixed version of the style object using all vendor prefixes
 * @param {Object} styles - Style object that gets prefixed properties added
 * @returns {Object} - Style object with prefixed properties and values
 */
export default function prefixAll(styles) {
  Object.keys(styles).forEach(property => {
    const value = styles[property]
    if (value instanceof Object && !Array.isArray(value)) {
      // recurse through nested style objects
      styles[property] = prefixAll(value)
    } else {
      Object.keys(prefixProperties).forEach(prefix => {
        const properties = prefixProperties[prefix]
        // add prefixes if needed
        if (properties[property]) {
          styles[prefix + capitalizeString(property)] = value
        }
      })
    }
  })

  Object.keys(styles).forEach(property => {
    [ ].concat(styles[property]).forEach((value, index) => {
      // resolve every special plugins
      plugins.forEach(plugin => assignStyles(styles, plugin(property, value)))
    })
  })

  return sortPrefixedStyle(styles)
}

function assignStyles(base, extend = { }) {
  Object.keys(extend).forEach(property => {
    const baseValue = base[property]
    if (Array.isArray(baseValue)) {
      [ ].concat(extend[property]).forEach(value => {
        const valueIndex = baseValue.indexOf(value)
        if (valueIndex > -1) {
          base[property].splice(valueIndex, 1)
        }
        base[property].push(value)
      })
    } else {
      base[property] = extend[property]
    }
  })
}
