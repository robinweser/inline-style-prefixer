import assign from 'object-assign'
import getBrowserInformation from './getBrowserInformation'
import caniuseData from './caniuseData'
import plugins from './Plugins'

let browserinfo = undefined
let browserProps = undefined
let lastUserAgent = undefined

const defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined

/**
 * Processes an object of styles using userAgent specific
 * @param {Object} styles - Styles object that gets prefixed
 * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
 */
export default (styles, userAgent = defaultUserAgent) => {
  if (userAgent && lastUserAgent !== userAgent) {
    browserinfo = getBrowserInformation(userAgent)
    let data = caniuseData[browserinfo.browser]
    if (data) {
      browserProps = Object.keys(data).filter(key => data[key] >= browserinfo.version)
    } else {
      console.warn('Your userAgent seems to be not supported by inline-style-prefixer. Feel free to open an issue.')
      return styles
    }
  }
  //only add prefixes if needed
  if (browserProps && browserProps.length > 0) {
    resolveProps(styles)
  }
  return styles
}


/**
 * Capitalizes first letter of a string
 * @param {String} str - str to caplitalize
 */
const caplitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1)


/**
 * Adds prefixed properties to a style object
 * @param {Object} styles - Style object that gets prefixed properties added
 */
export function resolveProps(styles) {
  Object.keys(styles).forEach(property => {
    let value = styles[property]
    if (value instanceof Object) {
      //recursively loop through nested style objects
      resolveProps(value)
    } else {
      //add prefixes if needed
      if (browserProps.indexOf(property) > -1) {
        styles[browserinfo.prefix.inline + caplitalizeString(property)] = value
        delete styles[property]
      }
      //resolve plugins
      plugins.forEach(plugin => assign(styles, plugin(property, value, browserinfo, styles)))
    }
  })
  return styles
}
