import prefixValue from '../utils/prefixValue'

import getBrowserInformation from '../utils/getBrowserInformation'
import getPrefixedKeyframes from '../utils/getPrefixedKeyframes'
import capitalizeString from '../utils/capitalizeString'
import addNewValuesOnly from '../utils/addNewValuesOnly'
import isObject from '../utils/isObject'

import prefixProps from './prefixProps'
import prefixAll from '../static/prefixAll'

import calc from './plugins/calc'
import flex from './plugins/flex'
import flexboxIE from './plugins/flexboxIE'
import flexboxOld from './plugins/flexboxOld'
import grabCursor from './plugins/grabCursor'
import gradient from './plugins/gradient'
import position from './plugins/position'
import sizing from './plugins/sizing'
import transition from './plugins/transition'
import zoomCursor from './plugins/zoomCursor'

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
  flex
]

export default class Prefixer {
  /**
   * Instantiante a new prefixer
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   * @param {string} keepUnprefixed - keeps unprefixed properties and values
   */
  constructor(options = {}) {
    const defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

    this._userAgent = options.userAgent || defaultUserAgent
    this._keepUnprefixed = options.keepUnprefixed || false

    if (this._userAgent) {
      this._browserInfo = getBrowserInformation(this._userAgent)
    }

    // Checks if the userAgent was resolved correctly
    if (this._browserInfo && this._browserInfo.cssPrefix) {
      this.prefixedKeyframes = getPrefixedKeyframes(
        this._browserInfo.browserName,
        this._browserInfo.browserVersion,
        this._browserInfo.cssPrefix
      )
    } else {
      this._useFallback = true
      return false
    }

    const prefixData = this._browserInfo.browserName && prefixProps[this._browserInfo.browserName]
    if (prefixData) {
      this._requiresPrefix = {}

      for (const property in prefixData) {
        if (prefixData[property] >= this._browserInfo.browserVersion) {
          this._requiresPrefix[property] = true
        }
      }

      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0
    } else {
      this._useFallback = true
    }

    this._metaData = {
      browserVersion: this._browserInfo.browserVersion,
      browserName: this._browserInfo.browserName,
      cssPrefix: this._browserInfo.cssPrefix,
      jsPrefix: this._browserInfo.jsPrefix,
      keepUnprefixed: this._keepUnprefixed,
      requiresPrefix: this._requiresPrefix
    }
  }

  prefix(style: Object): Object {
    // use prefixAll as fallback if userAgent can not be resolved
    if (this._useFallback) {
      return prefixAll(style)
    }

    // only add prefixes if needed
    if (!this._hasPropsRequiringPrefix) {
      return style
    }

    return this._prefixStyle(style)
  }

  _prefixStyle(style: Object): Object {
    for (const property in style) {
      const value = style[property]

      // handle nested objects
      if (isObject(value)) {
        style[property] = this.prefix(value)
        // handle array values
      } else if (Array.isArray(value)) {
        const combinedValue = []

        for (let i = 0, len = value.length; i < len; ++i) {
          const processedValue = prefixValue(plugins, property, value[i], style, this._metaData)
          addNewValuesOnly(combinedValue, processedValue || value[i])
        }

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (combinedValue.length > 0) {
          style[property] = combinedValue
        }
      } else {
        const processedValue = prefixValue(plugins, property, value, style, this._metaData)

        // only modify the value if it was touched
        // by any plugin to prevent unnecessary mutations
        if (processedValue) {
          style[property] = processedValue
        }

        // add prefixes to properties
        if (this._requiresPrefix[property]) {
          style[this._browserInfo.jsPrefix + capitalizeString(property)] = value
          if (!this._keepUnprefixed) {
            delete style[property]
          }
        }
      }
    }

    return style
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
