import getBrowserInformation from './utils/getBrowserInformation'
import getPrefixedKeyframes from './utils/getPrefixedKeyframes'
import capitalizeString from './utils/capitalizeString'
import assign from './utils/assign'
import warn from './utils/warn'
import caniuseData from './caniuseData'
import plugins from './Plugins'

const browserWhitelist = ['phantom']

const defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined
const defaultOpts = {
  userAgent: defaultUserAgent,
  keepUnprefixed: false
}

export default class Prefixer {
  /**
   * Instantiante a new prefixer
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   * @param {string} keepUnprefixed - keeps unprefixed properties and values
   */
  constructor(options = defaultOpts) {
    this._userAgent = options.userAgent
    this._keepUnprefixed = options.keepUnprefixed
    this._browserInfo = getBrowserInformation(this._userAgent)

    // Checks if the userAgent was resolved correctly
    if (this._browserInfo && this._browserInfo.prefix) {
      this.cssPrefix = this._browserInfo.prefix.CSS
      this.jsPrefix = this._browserInfo.prefix.inline
      this.prefixedKeyframes = getPrefixedKeyframes(this._browserInfo)
    } else {
      this._hasPropsRequiringPrefix = false
      warn('Either the global navigator was undefined or an invalid userAgent was provided.', 'Using a valid userAgent? Please let us know and create an issue at https://github.com/rofrischmann/inline-style-prefixer/issues')
      return false
    }
    let data = this._browserInfo.browser && caniuseData[this._browserInfo.browser]
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(key => data[key] >= this._browserInfo.version).reduce((result, name) => {
        result[name] = true
        return result
        }, {})
        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0
      } else {
        // check for whitelisted browsers
        browserWhitelist.forEach(browser => {
          if (this._browserInfo[browser]) {
            this._isWhitelisted = true
          }
        })
        this._hasPropsRequiringPrefix = false

        // Do not throw a warning if whitelisted
        if (this._isWhitelisted) {
          return true
        }
        warn('Your userAgent seems to be not supported by inline-style-prefixer. Feel free to open an issue.')
        return false
      }
    }

    /**
     * Returns a prefixed version of the style object
     * @param {Object} styles - Style object that gets prefixed properties added
     * @returns {Object} - Style object with prefixed properties and values
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
            assign(styles, plugin(property, value, this._browserInfo, styles, this._keepUnprefixed, false))
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
      const prefixes = {}
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

      styles = assign({}, styles)

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
              let browserInfo = {
                name: browser,
                prefix: style,
                version: 0 // assume lowest
              }
              assign(styles, plugin(property, value, browserInfo, styles, true, true))
            })
          })
        }
      })

      return styles
    }
  }
