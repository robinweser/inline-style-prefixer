import bowser from 'bowser'

const vendorPrefixes = {
  Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
  Moz: ['firefox', 'seamonkey', 'sailfish'],
  ms: ['msie', 'msedge']
}

const browsers = {
  chrome: [['chrome']],
  safari: [['safari']],
  firefox: [['firefox']],
  ie: [['msie']],
  edge: [['msedge']],
  opera: [['opera']],
  ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
  ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
  op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
  and_uc: [['android', 'mobile'], ['android', 'tablet']],
  android: [['android', 'mobile'], ['android', 'tablet']]
}

/**
 * Returns an object containing prefix data associated with a browser
 * @param {string} browser - browser to find a prefix for
 */
const getPrefixes = browser => {
  let prefixKeys
  let prefix
  let vendors
  let conditions
  let prefixVendor
  let browserVendors

  // Find the prefix for this browser (if any)
  prefixKeys = Object.keys(vendorPrefixes)
  for (prefix of prefixKeys) {
    // Find a matching vendor
    vendors = vendorPrefixes[prefix]
    conditions = browsers[browser]
    for (prefixVendor of vendors) {
      for (browserVendors of conditions) {
        if (browserVendors.indexOf(prefixVendor) !== -1) {
          return {
            inline: prefix,
            CSS: '-' + prefix.toLowerCase() + '-'
          }
        }
      }
    }
  }

  // No prefix found for this browser
  return {inline: '', CSS: ''}
}

/**
 * Uses bowser to get default browser information such as version and name
 * Evaluates bowser info and adds vendorPrefix information
 * @param {string} userAgent - userAgent that gets evaluated
 */
export default userAgent => {
  if (!userAgent) {
    return false
  }

  let info = {}

  // Special user agent, return all supported prefixes
  // instead of returning a string browser name and a prefix object
  // we return an array of browser names and map of prefixes for each browser
  if (userAgent === '*') {
    // Return an array of supported browsers
    info.browsers = Object.keys(browsers)

    // Return prefixes associated by browser
    info.prefixes = {}

    // Iterate browser list, assign prefix to each
    info.browsers.forEach(browser => {
      info.prefixes[browser] = getPrefixes(browser)
    })

    return info
  }

  // Normal user agent, detect browser
  info = bowser._detect(userAgent)

  Object.keys(vendorPrefixes).forEach(prefix => {
    vendorPrefixes[prefix].forEach(browser => {
      if (info[browser]) {
        info.prefix = {
          inline: prefix,
          CSS: '-' + prefix.toLowerCase() + '-'
        }
      }
    })
  })

  let name = ''
  Object.keys(browsers).forEach(browser => {
    browsers[browser].forEach(condition => {
      let match = 0
      condition.forEach(single => {
        if (info[single]) {
          match += 1
        }
      })
      if (condition.length === match) {
        name = browser
      }
    })
  })

  info.browser = name
  // For cordova IOS 8 the version is missing, set 0 to prevent NaN
  info.version = info.version ? parseFloat(info.version) : 0

  // seperate native android chrome
  // https://github.com/rofrischmann/inline-style-prefixer/issues/45
  if (info.browser === 'android' && info.chrome && info.version > 37) {
    info.browser = 'and_chr'
  }
  info.version = parseFloat(info.version)
  info.osversion = parseFloat(info.osversion)
  // For android < 4.4 we want to check the osversion
  // not the chrome version, see issue #26
  // https://github.com/rofrischmann/inline-style-prefixer/issues/26
  if (info.browser === 'android' && info.osversion < 5) {
    info.version = info.osversion
  }

  return info
}
