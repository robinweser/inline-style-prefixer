import getBrowserInformation from './getBrowserInformation'
import getPrefixedKeyframes from './getPrefixedKeyframes'
import caniuseData from './caniuseData'
import plugins from './Plugins'

const defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

// only throw warnings if devmode is enabled
const warn = (...message) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(...message)
  }
}
// helper to capitalize strings
const caplitalizeString = str => str.charAt(0).toUpperCase() + str.slice(1)

// leight polyfill for Object.assign
const assign = (base, extend) => {
  if (extend) {
    Object.keys(extend).forEach(key => base[key] = extend[key])
  }
  return extend
}



export default class Prefixer {
  /**
   * Instantiante a new prefixer.
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   */
  constructor(userAgent = defaultUserAgent) {
    this._userAgent = userAgent
    this._browserInfo = getBrowserInformation(userAgent)

    if (this._browserInfo) {
      this.cssPrefix = this._browserInfo.prefix.CSS
      this.jsPrefix = this._browserInfo.prefix.inline
      this.prefixedKeyframes = getPrefixedKeyframes(this._browserInfo)
    } else {
      this._hasPropsRequiringPrefix = false
      warn('Navigator was undefined and no custom userAgent was provided.')
    }
    let data = caniuseData[this._browserInfo.browser]
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(key => data[key] >= this._browserInfo.version).reduce((result, name) => {
        result[name] = true
        return result
        }, {})
        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0
      } else {
        this._hasPropsRequiringPrefix = false
        warn('Your userAgent seems to be not supported by inline-style-prefixer. Feel free to open an issue.')
      }
    }

    /**
     * Returns a prefixed version of the style object
     * @param {Object} styles - Style object that gets prefixed properties added
     * @returns {Object} - Style object with prefixed properties and valeus
     */
    prefix(styles) {
      // only add prefixes if needed
      if (!this._hasPropsRequiringPrefix) {
        return styles
      }

      styles = assign({}, styles)

      Object.keys(styles).forEach(property => {
        let value = styles[property]
        if (value instanceof Object) {
          // recursively loop through nested style objects
          styles[property] = this.prefix(value)
        } else {
          // add prefixes if needed
          if (this._requiresPrefix[property]) {
            styles[this.jsPrefix + caplitalizeString(property)] = value
            delete styles[property]
          }

          // resolve plugins
          plugins.forEach(plugin => {
            assign(styles, plugin(property, value, this._browserInfo, styles))
          })
        }
      })

      return styles
    }
  }
