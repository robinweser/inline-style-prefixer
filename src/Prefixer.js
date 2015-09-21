import paramCase from 'param-case'
import getBrowserInformation from './browserinfo'
import caniuseData from './caniuseData'
import hacks from './hacks'

let browserinfo
let requiredHacks = []
let requiredProperties = []
let defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined
let lastUserAgent = undefined
let generated = false

/**
 * Processes an object of styles using userAgent specific
 * @param {Object} styles - Styles object that gets prefixed
 * @param {Boolean} hacks - If hacks should be used to resolve browser differences
 */
export default (styles, userAgent = defaultUserAgent) => {
	if (lastUserAgent !== userAgent) {
		generated = false
		generateRequiredProperties(userAgent)
	}

	//only add prefixes if needed
	if (requiredProperties.length > 0) {
		addPrefixedProperties(styles)
	}
	return styles
}


/**
 * Adds prefixed properties to a style object
 * @param {Object} styles - Style object that gets prefixed properties added
 */
export function addPrefixedProperties(styles) {
	Object.keys(styles).forEach(property => {
		let value = styles[property]
		if (value instanceof Object) {
			//recursively loop through nested style objects
			addPrefixedProperties(value)
		} else {
			//add prefixes if needed
			if (isPrefixProperty(property)) {
				styles[getPrefixedProperty(property)] = value
			}
			//resolve hacks
			requiredHacks.forEach(hack => {
				resolveHack(hack, styles, property, value)
			})
		}
	})

	return styles
}

/**
 * Returns a prefixed value
 * Optionaly uses an alternative value
 * @param {string} property - CSS property that gets prefixed
 * @param {any} value - old value that gets prefixed
 * @param {any} alternative - alternative value used for prefixing 
 */
export function getPrefixedValue(property, value, alternative) {
	if (alternative) {
		return value.replace(value, browserinfo.prefix.CSS + alternative, 'g') + ';' + paramCase(property) + ':' + value
	} else {
		return browserinfo.prefix.CSS + value + ';' + paramCase(property) + ':' + value
	}
}

/**
 * Returns a prefixed style property
 * @param {String} property - a style property in camelCase
 * @param {String} prefix - evaluated vendor prefix that will be added
 */
export function getPrefixedProperty(property) {
	return browserinfo.prefix.inline + caplitalizeString(property)
}

/**
 * Capitalizes first letter of a string
 * @param {String} str - str to caplitalize
 */
export function caplitalizeString(str) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Checks if a property needs to be prefixed
 * @param {String} property - a style property
 */
export function isPrefixProperty(property) {
	return requiredProperties.indexOf(property) > -1
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
 * Generates an array of all relevant properties according to the userAgent
 * @param {string} userAgent - userAgent which gets used to gather information
 */
export function generateRequiredProperties(userAgent) {
	requiredProperties = []
	requiredHacks = []

	if (userAgent) {
		browserinfo = getBrowserInformation(userAgent)
		let data = caniuseData[browserinfo.browser.toLowerCase()]

		//only generate if there is browser data provided
		if (data) {
			let property
			for (property in data) {
				if (data[property] >= browserinfo.version) {
					requiredProperties.push(property)
				}
			}

			//add all required hacks for current browser
			let hack
			for (hack in hacks) {
				let hackData = hacks[hack](browserinfo)
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