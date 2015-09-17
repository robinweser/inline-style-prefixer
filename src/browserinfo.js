import bowser from 'bowser'

const vendorPrefixes = {
	'Webkit' : ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
	'Moz' : ['firefox', 'seamonkey', 'sailfish'],
	'ms' : ['msie', 'msedge']
}

/**
 * Uses bowser to get default browser information such as version and name
 * Evaluates bowser info and adds vendorPrefix information
 * @param {string} userAgent - userAgent that gets evaluated
 */
export default (userAgent) => {
  let info = bowser._detect(userAgent)

	let prefix
	for (prefix in vendorPrefixes) {
		vendorPrefixes[prefix].forEach(browser => {
			if (info[browser]) {
				info.prefix = {
					inline: prefix,
					CSS: '-' + prefix.toLowerCase() + '-'
				}
			}
		})
	}

  return info
}
