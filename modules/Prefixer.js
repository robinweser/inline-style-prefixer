import prefixAll from './static/prefixAll'
import getBrowserInformation from './utils/getBrowserInformation'
import getPrefixedKeyframes from './utils/getPrefixedKeyframes'
import capitalizeString from './utils/capitalizeString'
import sortPrefixedStyle from './utils/sortPrefixedStyle'
import prefixProps from './prefixProps'

import position from './plugins/position'
import calc from './plugins/calc'
import zoomCursor from './plugins/zoomCursor'
import grabCursor from './plugins/grabCursor'
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
  zoomCursor,
  grabCursor,
  sizing,
  gradient,
  transition,
  flexboxIE,
  flexboxOld,
  // this must be run AFTER the flexbox specs
  flex
]

export default class Prefixer {
  /**
   * Instantiante a new prefixer
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   * @param {string} keepUnprefixed - keeps unprefixed properties and values
   */
  constructor(options = { }) {
    const defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

    this._userAgent = options.userAgent || defaultUserAgent
    this._keepUnprefixed = options.keepUnprefixed || false

    this._browserInfo = getBrowserInformation(this._userAgent)

    // Checks if the userAgent was resolved correctly
    if (this._browserInfo && this._browserInfo.prefix) {
      // set additional prefix information
      this.cssPrefix = this._browserInfo.prefix.css
      this.jsPrefix = this._browserInfo.prefix.inline
      this.prefixedKeyframes = getPrefixedKeyframes(this._browserInfo)
    } else {
      this._usePrefixAllFallback = true
      return false
    }

    const data = this._browserInfo.browser && prefixProps[this._browserInfo.browser]
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(key => data[key] >= this._browserInfo.version).reduce((result, name) => {
        result[name] = true
        return result
      }, { })
      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0
    } else {
      this._usePrefixAllFallback = true
    }
  }

  /**
   * Returns a prefixed version of the style object
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */
  prefix(styles) {
    // use prefixAll as fallback if userAgent can not be resolved
    if (this._usePrefixAllFallback) {
      return prefixAll(styles)
    }

    // only add prefixes if needed
    if (!this._hasPropsRequiringPrefix) {
      return styles
    }

    Object.keys(styles).forEach(property => {
      let value = styles[property]
      if (value instanceof Object && !Array.isArray(value)) {
        // recurse through nested style objects
        styles[property] = this.prefix(value)
      } else {
        // add prefixes if needed
        if (this._requiresPrefix[property]) {
          styles[this.jsPrefix + capitalizeString(property)] = value
          if (!this._keepUnprefixed) {
            delete styles[property]
          }
        }
      }
    })

    Object.keys(styles).forEach(property => {
      [ ].concat(styles[property]).forEach(value => {
        // resolve plugins
        plugins.forEach(plugin => {
          // generates a new plugin interface with current data
          assignStyles(styles, plugin({
            property: property,
            value: value,
            styles: styles,
            browserInfo: this._browserInfo,
            prefix: {
              js: this.jsPrefix,
              css: this.cssPrefix,
              keyframes: this.prefixedKeyframes
            },
            keepUnprefixed: this._keepUnprefixed,
            requiresPrefix: this._requiresPrefix
          }), value, this._keepUnprefixed)
        })
      })
    })

    return sortPrefixedStyle(styles)
  }

  /**
   * Returns a prefixed version of the style object using all vendor prefixes
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */
  static prefixAll(styles) {
    return prefixAll(styles)
  }
}

function assignStyles(base, extend = { }, value, keepUnprefixed) {
  Object.keys(extend).forEach(property => {
    const baseValue = base[property]
    if (Array.isArray(baseValue)) {
      [ ].concat(extend[property]).forEach(val => {
        if (base[property].indexOf(val) === -1) {
          base[property].splice(baseValue.indexOf(value), keepUnprefixed ? 0 : 1, val)
        }
      })
    } else {
      base[property] = extend[property]
    }
  })
}
