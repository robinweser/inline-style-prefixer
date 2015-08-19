const vendorPrefixes = {
	firefox: 'Moz',
	chrome: 'Webkit',
	safari: 'Webkit',
	opera: 'O',
	ie: 'ms'
};

// (C) viazenetti GmbH (Christian Ludwig)
// http://jsfiddle.net/ChristianL/AVyND/
export default function getBrowserInfo(userAgent) {
	let browser;
	let version;
	let verOffset;

	if ((verOffset = userAgent.indexOf('Opera')) > -1) {
		browser = 'opera';
		version = userAgent.substring(verOffset + 6);
		if ((verOffset = userAgent.indexOf('Version')) > -1) {
			version = userAgent.substring(verOffset + 8);
		}
	} else if ((verOffset = userAgent.indexOf('MSIE')) > -1) {
		browser = 'ie';
		version = userAgent.substring(verOffset + 5);
	} else if ((verOffset = userAgent.indexOf('Chrome')) > -1) {
		browser = 'chrome';
		version = userAgent.substring(verOffset + 7);
	} else if ((verOffset = userAgent.indexOf('Safari')) > -1) {
		browser = 'safari';
		version = userAgent.substring(verOffset + 7);
		if ((verOffset = userAgent.indexOf('Version')) > -1) {
			version = userAgent.substring(verOffset + 8);
		}
	} else if ((verOffset = userAgent.indexOf('Firefox')) > -1) {
		browser = 'firefox';
		version = userAgent.substring(verOffset + 8);
	} else if (userAgent.indexOf('Trident/') > -1) {
		browser = 'ie';
		version = userAgent.substring(userAgent.indexOf('rv:') + 3);
	} else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) < (verOffset = userAgent.lastIndexOf('/'))) {
		browser = userAgent.substring(nameOffset, verOffset);
		version = userAgent.substring(verOffset + 1);
	}

	let prefix = vendorPrefixes[browser] ? vendorPrefixes[browser] : '';
	return {
		browser: browser,
		version: version,
		prefix: prefix,
		css: '-' + prefix.toLowerCase() + '-'
	};
}