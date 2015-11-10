import getBrowserInformation from './getBrowserInformation'
import caniuseData from './caniuseData'
import plugins from './Plugins'

const defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

export default class Prefixer {
  /**
   * Instantiante a new prefixer. Pass an asterisk as userAgent to combine all prefixes
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   */
  constructor(userAgent = defaultUserAgent) {
    this._userAgent = userAgent
    this._browserInfo = getBrowserInformation(userAgent)

    this.cssPrefix = this._browserInfo.prefix.CSS
    this.jsPrefix = this._browserInfo.prefix.inline  
    let data = this._browserInfo.browser && caniuseData[this._browserInfo.browser]
    if (data) {
      this._requiresPrefix = Object.keys(data).filter(key => data[key] >= this._browserInfo.version).reduce((result, name) => {
        result[name] = true
        return result
      }, {})
      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0
    } else {
      this._hasPropsRequiringPrefix = false

      // TODO warn only in dev mode
      console.warn('Your userAgent seems to be not supported by inline-style-prefixer. Feel free to open an issue.')
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
          styles[this.jsPrefix + caplitalizeString(property)] = value
          delete styles[property]
        }

        // resolve plugins
        plugins.forEach(plugin => {
          assign(styles, plugin(property, value, this._browserInfo, styles, false))
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
    if (!Object.keys(prefixes).length > 0)
      return styles

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
            styles[style.inline + caplitalizeString(property)] = value
          }

          // resolve plugins for each browser
          plugins.forEach(plugin => {
            let browserInfo = {
              name: browser,
              prefix: style,
              version: 0 // assume lowest
            }
            assign(styles, plugin(property, value, browserInfo, styles, true))
          })
        });
      }
    })

    return styles
  }
}

  // helper to capitalize strings
  const caplitalizeString = str => str.charAt(0).toUpperCase() + str.slice(1)

  // leight polyfill for Object.assign
  const assign = (base, extend) => {
    extend && Object.keys(extend).forEach(key => base[key] = extend[key])
    return extend
    }