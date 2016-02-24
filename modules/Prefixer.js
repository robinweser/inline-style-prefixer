import getBrowserInformation from './utils/getBrowserInformation'
import getPrefixedKeyframes from './utils/getPrefixedKeyframes'
import capitalizeString from './utils/capitalizeString'
import assign from './utils/assign'
import caniuseData from './caniuseData'
import plugins from './Plugins'

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

    let data = this._browserInfo.browser && caniuseData[this._browserInfo.browser]
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
      return Prefixer.prefixAll(styles)
    }

    // only add prefixes if needed
    if (!this._hasPropsRequiringPrefix) {
      return styles
    }

    styles = assign({ }, styles)

    Object.keys(styles).forEach(property => {
      let value = styles[property]
      if (value instanceof Object) {
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

        // resolve plugins
        plugins.forEach(plugin => {
          // generates a new plugin interface with current data
          const resolvedStyles = plugin({
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
            requiresPrefix: this._requiresPrefix,
            forceRun: false
          })
          assign(styles, resolvedStyles)
        })
      }
    })

    return styles
  }

  /**
   * Returns a prefixed version of the style object using all vendor prefixes
   * @param {Object} styles - Style object that gets prefixed properties added
   * @returns {Object} - Style object with prefixed properties and values
   */
  static prefixAll(styles) {
    const prefixes = { }
    const browserInfo = getBrowserInformation('*')

    browserInfo.browsers.forEach(browser => {
      let data = caniuseData[browser]
      if (data) {
        assign(prefixes, data)
      }
    })

    // there should always be at least one prefixed style, but just incase
    if (!Object.keys(prefixes).length > 0) {
      return styles
    }

    styles = assign({ }, styles)

    Object.keys(styles).forEach(property => {
      let value = styles[property]
      if (value instanceof Object) {
        // recurse through nested style objects
        styles[property] = Prefixer.prefixAll(value)
      } else {
        let browsers = Object.keys(browserInfo.prefixes)
        browsers.forEach(browser => {
          let style = browserInfo.prefixes[browser]
          // add prefixes if needed
          if (prefixes[property]) {
            styles[style.inline + capitalizeString(property)] = value
          }

          // resolve plugins for each browser
          plugins.forEach(plugin => {
            const resolvedStyles = plugin({
              property: property,
              value: value,
              styles: styles,
              browserInfo: {
                name: browser,
                prefix: style,
                version: 0 // assume lowest
              },
              prefix: {},
              keepUnprefixed: true,
              requiresPrefix: prefixes,
              forceRun: true
            })
            assign(styles, resolvedStyles)
          })
        })
      }
    })

    return styles
  }
}
