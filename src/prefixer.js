import prefixProperties from './data';
import checkBrowser from './utils/checkBrowser';

const vendorPrefixes = {
	firefox: 'Moz',
	chrome: 'Webkit',
	safari: 'Webkit',
	ie: 'ms',
	opera : 'O'
};

let prefix = '';
let info;
let requiredProperties = [];
let ua = (typeof navigator !== 'undefined' ? navigator.userAgent : undefined);
let generated = false;

export default {
	/**
	 * Sets the used userAgent
	 * @param {string} userAgent - a valid userAgent string
	 */
	setUserAgent(userAgent) {
			ua = userAgent;
			generateRequiredProperties();
		},

		/**
		 * Returns the currently used userAgent
		 */
		getUserAgent() {
			return ua;
		},

		/**
		 * Processes an object of styles using userAgent specific 
		 * @param {Object} styles - Styles object that gets prefixed
		 * @param {Boolean} hacks - If hacks should be used to resolve browser differences
		 */
		process(styles, hacks = true) {
			if (!generated) {
				generateRequiredProperties();
			}
			if (requiredProperties.length > 0) {
				addPrefixedProperties(styles);
			} 
			return styles;
		}
}


/**
 * Generates an array of all relevant properties according to the userAgent
 * @param {string} userAgent - a valid userAgent string
 */
export function generateRequiredProperties() {
	if (ua) {
		info = checkBrowser(ua);
		let data = prefixProperties[info.browser];

		//only generate if there is browser data provided
		if (data) {
			prefix = vendorPrefixes[info.browser];

			let propperty;
			for (propperty in data) {
				if (data[propperty] >= info.version) {
					requiredProperties.push(propperty);
				}
			}
			generated = true;
			return requiredProperties;
		} else {
			console.warn('Your browser seems to not be supported by inline-style-prefixer.');
			console.warn('Please create an issue at https://github.com/rofrischmann/inline-style-prefixer');
			return false;
		}
	} else {
		console.warn('userAgent needs to be set first. Use `.setUserAgent(userAgent)`');
		return false;
	}
}

/**
 * Adds prefixed properties to a style object
 * @param {Map} styles - Style object that gets prefixed properties added
 */
export function addPrefixedProperties(styles) {
	let property;

	for (property in styles) {
		let value = styles[property];

		if (value instanceof Object) {
			addPrefixedProperties(value);
		} else {
			if (isPrefixProperty(property)) {
				styles[generatePrefixedProperty(property)] = value;
			}
		}
	}
	return styles;
}



/**
 * Capitalizes first letter of a string
 * @param {String} str - str to caplitalize
 */
export function caplitalizeString(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns a prefixed style property
 * @param {String} property - a style property in camelCase
 * @param {String} prefix - evaluated vendor prefix that will be added
 */
export function generatePrefixedProperty(property) {
	return prefix + caplitalizeString(property);
}

/**
 * Checks if a property needs to be prefixed
 * @param {String} property - a style property
 */
export function isPrefixProperty(property) {
	return requiredProperties.indexOf(property) > -1;
}