import bowser from 'bowser'

const vendorPrefixes = {
  Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
  Moz: ['firefox', 'seamonkey', 'sailfish'],
  ms: ['msie', 'msedge']
}

const browsers = {
  chrome: [['chrome'], ['phantom'], ['webos'], ['blackberry'], ['bada'], ['tizenn']],
  safari: [['safari']],
  firefox: [['firefox'], ['seamonkey'], ['sailfish']],
  ie: [['msie'], ['msedge']],
  opera: [['opera']],
  ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
  ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
  op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
  and_chr: [['android', 'chrome', 'mobile'], ['android', 'chrome', 'tablet']],
  and_uc: [['android', 'mobile'], ['android', 'mobile']],
  android: [['android', 'mobile'], ['android', 'mobile']]
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

  let info = bowser._detect(userAgent)

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
