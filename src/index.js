import paramCase from 'param-case'
import browserInfo from './browserinfo'
import prefixProperties from './data'
import hacks from './hacks'

let info
let requiredProperties = []
let requiredHacks = []
let ua = typeof navigator !== 'undefined' ? navigator.userAgent : undefined
let generated = false

export default {
  /**
   * Sets the used userAgent
   * @param {string} userAgent - a valid userAgent string
   */
  setUserAgent(userAgent) {
      ua = userAgent
      generateRequiredProperties()
    },

    /**
     * Returns the currently used userAgent
     */
    getUserAgent() {
      return ua
    },

    /**
     * Processes an object of styles using userAgent specific
     * @param {Object} styles - Styles object that gets prefixed
     * @param {Boolean} hacks - If hacks should be used to resolve browser differences
     */
    process(styles) {
      if (!generated) {
        generateRequiredProperties()
      }
      if (requiredProperties.length > 0) {
        addPrefixedProperties(styles)
      }
      return styles;
    }
}

/**
 * Adds prefixed properties to a style object
 * @param {Object} styles - Style object that gets prefixed properties added
 */
export function addPrefixedProperties(styles) {
  let property

  for (property in styles) {
    let value = styles[property]

    if (value instanceof Object) {
      //recursively loop through nested style objects
      addPrefixedProperties(value)
    } else {
      //add prefixes if needed
      if (isPrefixProperty(property)) {
        styles[generatePrefixedProperty(property)] = value
      }

      //resolve hacks
      requiredHacks.forEach(hack => {
        resolveHack(hack, styles, property, value)
      });

    }
  }
  return styles;
}


function getPrefixedValue(property, oldValue, newValue) {
  if (newValue) {
    return value.replace(oldValue, info.prefix.CSS + newValue, 'g') + ';' + paramCase(property) + ':' + oldValue
  } else {
    return info.prefix.CSS + oldValue + ';' + paramCase(property) + ':' + oldValue
  }
}

/**
 * Resolves browser issues using some hacks
 * @param {Object} hackData - contains a condition and properties/values that need to be corrected
 * @param {Object} styles - a style object
 * @param {string} property - property that gets corrected
 * @param {any} value - property value
 */
export function resolveHack(hackData, styles, property, value) {

  //prefix ordinary values
  if (hackData.prefixValue) {

    let values = hackData.prefixValue[property]
    if (values) {
      if (hackData.containValue) {
        values.forEach(val => {
          if (value.indexOf(val) > -1) {
            styles[property] = getPrefixedValue(property, value, val)
          }
        })
      } else {
        if (values.indexOf(value) > -1) {
          styles[property] = getPrefixedValue(property, value)
        }
      }
    }
  }

  //resolve property issues
  if (hackData.alternativeProperty) {

    let oldProperty = hackData.alternativeProperty[property]
    if (oldProperty) {
      styles[oldProperty] = value
    }
  }

  //resolve alternative values
  if (hackData.alternativeValue) {

    let oldValue = hackData.alternativeValue[property];
    if (oldValue && oldValue[value]) {
      styles[property] = oldValue[value] + ';' + paramCase(property) + ':' + value
    }
  }
}

/**
 * Capitalizes first letter of a string
 * @param {String} str - str to caplitalize
 */
export function caplitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Returns a prefixed style property
 * @param {String} property - a style property in camelCase
 * @param {String} prefix - evaluated vendor prefix that will be added
 */
export function generatePrefixedProperty(property) {
  return info.prefix.inline + caplitalizeString(property)
}

/**
 * Checks if a property needs to be prefixed
 * @param {String} property - a style property
 */
export function isPrefixProperty(property) {
  return requiredProperties.indexOf(property) > -1
}


/**
 * Generates an array of all relevant properties according to the userAgent
 * @param {string} userAgent - userAgent which gets used to gather information
 */
export function generateRequiredProperties(userAgent = ua) {
  requiredProperties = []
  requiredHacks = []

  if (userAgent) {
    info = browserInfo(userAgent)
    let data = prefixProperties[info.name.toLowerCase()]

    //only generate if there is browser data provided
    if (data) {
      let property
      for (property in data) {
        if (data[property] >= info.version) {
          requiredProperties.push(property)
        }
      }

      //add all required hacks for current browser
      let hack;
      for (hack in hacks) {
        let hackData = hacks[hack](info)
        if (hackData) {
          requiredHacks.push(hackData)
        }
      }


      generated = true
      return requiredProperties
    } else {
      console.warn('Your browser seems to not be supported by inline-style-prefixer.')
      console.warn('Please create an issue at https://github.com/rofrischmann/inline-style-prefixer')
      return false
    }
  } else {
    console.warn('userAgent needs to be set first. Use `.setUserAgent(userAgent)`')
    return false
  }
}
