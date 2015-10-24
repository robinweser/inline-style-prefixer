import bowser from 'bowser'

const vendorPrefixes = {
  'Webkit': ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
  'Moz': ['firefox', 'seamonkey', 'sailfish'],
  'ms': ['msie', 'msedge']
}

const browsers = {
  'chrome': [['chrome'], ['phantom'], ['webos'], ['blackberry'], ['bada'], ['tizenn']],
  'safari': [['safari']],
  'firefox': [['firefox'], ['seamonkey'], ['sailfish']],
  'ie': [['msie'], ['msedge']],
  'opera': [['opera']],
  'ios_saf': [['ios', 'mobile'], ['ios', 'tablet']],
  'ie_mob': [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
  'op_mini': [['opera', 'mobile'], ['opera', 'tablet']],
  'and_chr': [['android', 'chrome', 'mobile'], ['android', 'chrome', 'tablet']],
  'and_uc': [['android', 'mobile'], ['android', 'mobile']],
  'android': [['android', 'mobile'], ['android', 'mobile']]
}

/**
 * Returns an object containing prefix data associated with a browser
 * @param {string} browser - browser to find a prefix for
 */
const getPrefixes = browser => {
  let prefixKeys,
    prefix,
    vendors,
    conditions,
    prefixVendor,
    browserVendors

  // Find the prefix for this browser (if any)
  prefixKeys = Object.keys(vendorPrefixes)
  for (prefix of prefixKeys) {
    // Find a matching vendor
    vendors = vendorPrefixes[prefix]
    conditions = browsers[browser]
    for (prefixVendor of vendors) {
      for (browserVendors of conditions) {
        if (browserVendors.includes(prefixVendor)) {
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
  let info = {};

  // Special user agent, return all supported prefixes
  // instead of returning a string browser name and a prefix object
  // we return an array of browser names and map of prefixes for each browser
  if (userAgent && userAgent === '*') {
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
  return info
}