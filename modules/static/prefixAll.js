import prefixProperties from './prefixProps'
import capitalizeString from '../utils/capitalizeString'
import assign from '../utils/assign'

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
    } else if (Array.isArray(value)) {
      // prefix fallback arrays
      assign(styles, prefixArray(property, value))
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
    const value = styles[property]
    // resolve every special plugins
    plugins.forEach(plugin => assign(styles, plugin(property, value)))
  })

  return styles
}

function prefixArray(property, valueArray) {
  let result = { }
  valueArray.forEach(value => {
    plugins.forEach(plugin => {
      let prefixed = plugin(property, value)
      if (prefixed) {
        Object.keys(prefixed).forEach(prop => {
          const entry = prefixed[prop]
          result[prop] = result[prop] ? mergeValues(result[prop], entry) : entry
        })
      }
    })
    if (!result[property]) {
      result[property] = value
    }
  })
  return result
}

function mergeValues(existing, toMerge) {
  let merged = existing
  let valuesToMerge = Array.isArray(toMerge) ? toMerge : [ toMerge ]
  valuesToMerge.forEach(value => {
    if (Array.isArray(merged) && merged.indexOf(value) === -1) {
      merged.push(value)
    } else if (merged !== value) {
      merged = [ merged, value ]
    }
  })
  return merged
}
