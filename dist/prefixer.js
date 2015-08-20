(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var prefixes = {"ie":{"flex":10,"flexBasis":10,"flexDirection":10,"flexGrow":10,"flexFlow":10,"flexShrink":10,"alignContent":10,"alignItems":10,"alignSelf":10,"justifyContent":10,"order":10,"userSelect":11,"wrapFlow":11,"wrapThrough":11,"wrapMargin":11,"scrollSnapType":11,"scrollSnapPointsX":11,"scrollSnapPointsY":11,"scrollSnapDestination":11,"scrollSnapCoordinate":11,"touchAction":10,"hyphens":11,"flowInto":11,"flowFrom":11,"regionFragment":11,"gridTemplateColumns":11,"gridTemplateRows":11,"gridTemplateAreas":11,"gridTemplate":11,"gridAutoColumns":11,"gridAutoRows":11,"gridAutoFlow":11,"grid":11,"gridRowStart":11,"gridColumnStart":11,"gridRowEnd":11,"gridRow":11,"gridColumn":11,"gridArea":11,"rowGap":11,"gridGap":11},"firefox":{"borderRadius":3.6,"borderImage":14,"borderImageOutset":14,"borderImageRepeat":14,"borderImageSlice":14,"borderImageSource":14,"borderImageWidth":14,"flex":21,"flexBasis":21,"flexDirection":21,"flexGrow":21,"flexFlow":21,"flexShrink":21,"alignContent":21,"alignItems":21,"alignSelf":21,"justifyContent":21,"order":21,"transition":15,"transitionDelay":15,"transitionDuration":15,"transitionProperty":15,"transitionTimingFunction":15,"backfaceVisibility":15,"perspective":15,"perspectiveOrigin":15,"transform":15,"transformOrigin":15,"transformStyle":15,"transformOriginX":15,"transformOriginY":15,"animation":15,"animationDelay":15,"animationDirection":15,"animationFillMode":15,"animationDuration":15,"anmationIterationCount":15,"animationName":15,"animationPlayState":15,"animationTimingFunction":15,"appearance":42,"userSelect":42,"boxSizing":28,"textAlignLast":42,"textDecorationStyle":35,"textDecorationSkip":35,"textDecorationLine":35,"textDecorationColor":35,"tabSize":42,"resize":4,"hyphens":42,"breakBefore":42,"breakAfter":42,"breakInside":42,"columnGap":42,"backgroundClip":3.6,"backgroundOrigin":3.6,"backgroundSize":3.6,"fontFeatureSettings":33,"boxShadow":3.6,"columnCount":42,"columnFill":42,"columnRule":42,"columnRuleColor":42,"columnRuleStyle":42,"columnRuleWidth":42,"columns":42,"columnSpan":42,"columnWidth":42},"safari":{"borderRadius":4,"borderImage":5.1,"borderImageOutset":5.1,"borderImageRepeat":5.1,"borderImageSlice":5.1,"borderImageSource":5.1,"borderImageWidth":5.1,"flex":8,"flexBasis":8,"flexDirection":8,"flexGrow":8,"flexFlow":8,"flexShrink":8,"alignContent":8,"alignItems":8,"alignSelf":8,"justifyContent":8,"order":8,"transition":6,"transitionDelay":6,"transitionDuration":6,"transitionProperty":6,"transitionTimingFunction":6,"backfaceVisibility":8,"perspective":8,"perspectiveOrigin":8,"transform":8,"transformOrigin":8,"transformStyle":8,"transformOriginX":8,"transformOriginY":8,"animation":8,"animationDelay":8,"animationDirection":8,"animationFillMode":8,"animationDuration":8,"anmationIterationCount":8,"animationName":8,"animationPlayState":8,"animationTimingFunction":8,"appearance":9,"userSelect":9,"backdropFilter":9,"boxSizing":5,"fontKerning":9,"scrollSnapType":9,"scrollSnapPointsX":9,"scrollSnapPointsY":9,"scrollSnapDestination":9,"scrollSnapCoordinate":9,"textEmphasisPosition":7,"textEmphasis":7,"textEmphasisStyle":7,"textEmphasisColor":7,"boxDecorationBreak":9,"clipPath":9,"maskImage":9,"maskMode":9,"maskRepeat":9,"maskPosition":9,"maskClip":9,"maskOrigin":9,"maskSize":9,"maskComposite":9,"mask":9,"maskBorderSource":9,"maskBorderMode":9,"maskBorderSlice":9,"maskBorderWidth":9,"maskBorderOutset":9,"maskBorderRepeat":9,"maskBorder":9,"maskType":9,"textDecorationStyle":9,"textDecorationSkip":9,"textDecorationLine":9,"textDecorationColor":9,"shapeImageThreshold":9,"shapeImageMargin":9,"shapeImageOutside":9,"filter":9,"hyphens":9,"flowInto":9,"flowFrom":9,"breakBefore":8,"breakAfter":8,"breakInside":8,"regionFragment":9,"columnGap":8,"boxShadow":5,"columnCount":8,"columnFill":8,"columnRule":8,"columnRuleColor":8,"columnRuleStyle":8,"columnRuleWidth":8,"columns":8,"columnSpan":8,"columnWidth":8},"chrome":{"borderRadius":4,"borderImage":15,"borderImageOutset":15,"borderImageRepeat":15,"borderImageSlice":15,"borderImageSource":15,"borderImageWidth":15,"flex":28,"flexBasis":28,"flexDirection":28,"flexGrow":28,"flexFlow":28,"flexShrink":28,"alignContent":28,"alignItems":28,"alignSelf":28,"justifyContent":28,"order":28,"transition":25,"transitionDelay":25,"transitionDuration":25,"transitionProperty":25,"transitionTimingFunction":25,"backfaceVisibility":35,"perspective":35,"perspectiveOrigin":35,"transform":35,"transformOrigin":35,"transformStyle":35,"transformOriginX":35,"transformOriginY":35,"animation":42,"animationDelay":42,"animationDirection":42,"animationFillMode":42,"animationDuration":42,"anmationIterationCount":42,"animationName":42,"animationPlayState":42,"animationTimingFunction":42,"appearance":47,"userSelect":47,"boxSizing":9,"fontKerning":32,"textEmphasisPosition":47,"textEmphasis":47,"textEmphasisStyle":47,"textEmphasisColor":47,"boxDecorationBreak":47,"clipPath":47,"maskImage":47,"maskMode":47,"maskRepeat":47,"maskPosition":47,"maskClip":47,"maskOrigin":47,"maskSize":47,"maskComposite":47,"mask":47,"maskBorderSource":47,"maskBorderMode":47,"maskBorderSlice":47,"maskBorderWidth":47,"maskBorderOutset":47,"maskBorderRepeat":47,"maskBorder":47,"maskType":47,"textDecorationStyle":47,"textDecorationSkip":47,"textDecorationLine":47,"textDecorationColor":47,"filter":47,"flowInto":18,"flowFrom":18,"breakBefore":47,"breakAfter":47,"breakInside":47,"regionFragment":18,"columnGap":47,"fontFeatureSettings":47,"boxShadow":9,"columnCount":47,"columnFill":47,"columnRule":47,"columnRuleColor":47,"columnRuleStyle":47,"columnRuleWidth":47,"columns":47,"columnSpan":47,"columnWidth":47},"opera":{"borderImage":12.1,"borderImageOutset":12.1,"borderImageRepeat":12.1,"borderImageSlice":12.1,"borderImageSource":12.1,"borderImageWidth":12.1,"flex":16,"flexBasis":16,"flexDirection":16,"flexGrow":16,"flexFlow":16,"flexShrink":16,"alignContent":16,"alignItems":16,"alignSelf":16,"justifyContent":16,"order":16,"transition":12,"transitionDelay":12,"transitionDuration":12,"transitionProperty":12,"transitionTimingFunction":12,"backfaceVisibility":22,"perspective":22,"perspectiveOrigin":22,"transform":22,"transformOrigin":22,"transformStyle":22,"transformOriginX":22,"transformOriginY":22,"animation":29,"animationDelay":29,"animationDirection":29,"animationFillMode":29,"animationDuration":29,"anmationIterationCount":29,"animationName":29,"animationPlayState":29,"animationTimingFunction":29,"appearance":32,"userSelect":32,"fontKerning":19,"textEmphasisPosition":32,"textEmphasis":32,"textEmphasisStyle":32,"textEmphasisColor":32,"boxDecorationBreak":32,"clipPath":32,"maskImage":32,"maskMode":32,"maskRepeat":32,"maskPosition":32,"maskClip":32,"maskOrigin":32,"maskSize":32,"maskComposite":32,"mask":32,"maskBorderSource":32,"maskBorderMode":32,"maskBorderSlice":32,"maskBorderWidth":32,"maskBorderOutset":32,"maskBorderRepeat":32,"maskBorder":32,"maskType":32,"tabSize":12.1,"filter":32,"breakBefore":32,"breakAfter":32,"breakInside":32,"columnGap":32,"objectFit":12.1,"objectPosition":12.1,"textOverflow":10.6,"backgroundClip":10,"backgroundOrigin":10,"backgroundSize":10,"fontFeatureSettings":32,"columnCount":32,"columnFill":32,"columnRule":32,"columnRuleColor":32,"columnRuleStyle":32,"columnRuleWidth":32,"columns":32,"columnSpan":32,"columnWidth":32}}; module.exports = prefixes
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _hacksCursor = require('./hacks/cursor');

var _hacksCursor2 = _interopRequireDefault(_hacksCursor);

var _hacksFlexbox = require('./hacks/flexbox');

var _hacksFlexbox2 = _interopRequireDefault(_hacksFlexbox);

var _hacksSizing = require('./hacks/sizing');

var _hacksSizing2 = _interopRequireDefault(_hacksSizing);

var _hacksGradient = require('./hacks/gradient');

var _hacksGradient2 = _interopRequireDefault(_hacksGradient);

//special flexbox specifications

var _hacksFlexspec2009 = require('./hacks/flexspec/2009');

var _hacksFlexspec20092 = _interopRequireDefault(_hacksFlexspec2009);

var _hacksFlexspec2012 = require('./hacks/flexspec/2012');

var _hacksFlexspec20122 = _interopRequireDefault(_hacksFlexspec2012);

exports['default'] = {
	cursor: _hacksCursor2['default'],
	flexbox: _hacksFlexbox2['default'],
	sizing: _hacksSizing2['default'],
	gradient: _hacksGradient2['default'],
	flexbox2009: _hacksFlexspec20092['default'],
	flexbox2012: _hacksFlexspec20122['default']
};
module.exports = exports['default'];
},{"./hacks/cursor":3,"./hacks/flexbox":4,"./hacks/flexspec/2009":5,"./hacks/flexspec/2012":6,"./hacks/gradient":7,"./hacks/sizing":8}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = hack;
function condition(browserInfo) {
	return browserInfo.prefix.inline == 'Webkit' || browserInfo.prefix.inline == 'Moz' && browserInfo.version <= 23;
}

function hack(browserInfo) {
	if (condition(browserInfo)) {

		return {
			prefixValue: {
				cursor: ['zoom-in', 'zoom-out', 'grab', 'grabbing']
			}
		};
	} else {
		return false;
	}
}

module.exports = exports['default'];
},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = hack;
function condition(browserInfo) {
	return browserInfo.prefix.inline == 'Webkit';
}

function hack(browserInfo) {
	if (condition(browserInfo)) {

		return {
			prefixValue: {
				display: ['flex', 'inline-flex']
			}
		};
	} else {
		return false;
	}
}

module.exports = exports['default'];
},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = hack;
function condition(browserInfo) {
	return browserInfo.prefix.inline == 'Webkit' && browserInfo.version < 4.4;
}

function hack(browserInfo) {
	if (condition(browserInfo)) {

		return {
			prefixValue: {},
			alternativeProperty: {},
			alternativeValue: {}
		};
	} else {
		return false;
	}
}

module.exports = exports['default'];
},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = hack;
function condition(browserInfo) {
	return browserInfo.browser == 'ie' && browserInfo.version == 10;
}

function hack(browserInfo) {
	if (condition(browserInfo)) {

		var msValues = {
			'space-around': 'distribute',
			'space-between': 'justify',
			'flex-start': 'start',
			'flex-end': 'end'
		};

		return {
			alternativeProperty: {
				'justifyContent': 'msFlexPack',
				'alignItems': 'msFlexAlign',
				'alignContent': 'msFlexLinePack',
				'order': 'msFlexOrder',
				'alignSelf': 'msFlexItemAlign',
				'flexGrow': 'msFlexPositive',
				'flexShrink': 'msFlexNegative',
				'flexBasis': 'msPreferredSize'
			},
			alternativeValue: {
				justifyContent: msValues,
				alignContent: msValues,
				display: {
					'flex': browserInfo.prefix.css + 'flexbox',
					'inline-flex': browserInfo.prefix.css + 'inline-flexbox'
				}
			}
		};
	} else {
		return false;
	}
}

module.exports = exports['default'];
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = hack;
function condition(browserInfo) {
	return browserInfo.browser == 'chrome' && browserInfo.version <= 25 || browserInfo.browser == 'firefox' && browserInfo.version <= 15 || browserInfo.browser == 'opera' && browserInfo.version == 11.5 || browserInfo.browser == 'safari' && browserInfo.version <= 6.1;
}

function hack(browserInfo) {
	if (condition(browserInfo)) {

		var gradients = ['linear-gradient', 'radial-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient'];

		return {
			prefixValue: {
				background: gradients,
				backgroundImage: gradients
			},
			containValue: true
		};
	} else {
		return false;
	}
}

module.exports = exports['default'];
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = hack;
function condition(browserInfo) {
	/**
  * This actually is only available with prefixes
  * NOTE: This might change in the feature
  */
	return true;
}

function hack(browserInfo) {
	if (condition(browserInfo)) {

		var sizingValues = ['min-content', 'max-content', 'fill-available', 'fit-content'];
		var containFloats = Array.apply(undefined, sizingValues);
		containFloats.push('contain-floats');

		return {
			prefixValue: {
				columnWidth: sizingValues,
				maxHeight: sizingValues,
				maxWidth: sizingValues,
				width: sizingValues,
				height: sizingValues,
				minWidth: containFloats,
				minHeight: containFloats
			}
		};
	} else {
		return false;
	}
}

module.exports = exports['default'];
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.addPrefixedProperties = addPrefixedProperties;
exports.resolveHack = resolveHack;
exports.caplitalizeString = caplitalizeString;
exports.generatePrefixedProperty = generatePrefixedProperty;
exports.isPrefixProperty = isPrefixProperty;
exports.generateRequiredProperties = generateRequiredProperties;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _paramCase = require('param-case');

var _paramCase2 = _interopRequireDefault(_paramCase);

var _utilsGetBrowserInfo = require('./utils/getBrowserInfo');

var _utilsGetBrowserInfo2 = _interopRequireDefault(_utilsGetBrowserInfo);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _hacks = require('./hacks');

var _hacks2 = _interopRequireDefault(_hacks);

var info = undefined;
var requiredProperties = [];
var requiredHacks = [];
var ua = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
var generated = false;

exports['default'] = {
	/**
  * Sets the used userAgent
  * @param {string} userAgent - a valid userAgent string
  */
	setUserAgent: function setUserAgent(userAgent) {
		ua = userAgent;
		generateRequiredProperties();
	},

	/**
  * Returns the currently used userAgent
  */
	getUserAgent: function getUserAgent() {
		return ua;
	},

	/**
  * Processes an object of styles using userAgent specific 
  * @param {Object} styles - Styles object that gets prefixed
  * @param {Boolean} hacks - If hacks should be used to resolve browser differences
  */
	process: function process(styles) {
		if (!generated) {
			generateRequiredProperties();
		}
		if (requiredProperties.length > 0) {
			addPrefixedProperties(styles);
		}
		return styles;
	}
};

/**
 * Adds prefixed properties to a style object
 * @param {Object} styles - Style object that gets prefixed properties added
 */

function addPrefixedProperties(styles) {
	var property = undefined;

	var _loop = function () {
		var value = styles[property];

		if (value instanceof Object) {
			//recursively loop through nested style objects
			addPrefixedProperties(value);
		} else {
			//add prefixes if needed
			if (isPrefixProperty(property)) {
				styles[generatePrefixedProperty(property)] = value;
			}

			//resolve hacks
			requiredHacks.forEach(function (hack) {
				resolveHack(hack, styles, property, value);
			});
		}
	};

	for (property in styles) {
		_loop();
	}
	return styles;
}

function getPrefixedValue(property, oldValue, newValue) {
	if (newValue) {
		return value.replace(oldValue, info.prefix.css + newValue, 'g') + ';' + (0, _paramCase2['default'])(property) + ':' + oldValue;
	} else {
		return info.prefix.css + oldValue + ';' + (0, _paramCase2['default'])(property) + ':' + oldValue;
	}
}

/**
 * Resolves browser issues using some hacks
 * @param {Object} hackData - contains a condition and properties/values that need to be corrected
 * @param {Object} styles - a style object
 * @param {string} property - property that gets corrected
 * @param {any} value - property value
 */

function resolveHack(hackData, styles, property, value) {

	//prefix ordinary values
	if (hackData.prefixValue) {

		var values = hackData.prefixValue[property];
		if (values) {
			if (hackData.containValue) {
				values.forEach(function (val) {
					if (value.indexOf(val) > -1) {
						styles[property] = getPrefixedValue(property, value, val);
					}
				});
			} else {
				styles[property] = getPrefixedValue(property, value);
			}
		}
	}

	//resolve property issues
	if (hackData.alternativeProperty) {

		var oldProperty = hackData.alternativeProperty[property];
		if (oldProperty) {
			styles[oldProperty] = value;
		}
	}

	//resolve alternative values
	if (hackData.alternativeValue) {

		var oldValue = hackData.alternativeValue[property];
		if (oldValue && oldValue[value]) {
			styles[property] = oldValue[value] + ';' + (0, _paramCase2['default'])(property) + ':' + value;
		}
	}
}

/**
 * Capitalizes first letter of a string
 * @param {String} str - str to caplitalize
 */

function caplitalizeString(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns a prefixed style property
 * @param {String} property - a style property in camelCase
 * @param {String} prefix - evaluated vendor prefix that will be added
 */

function generatePrefixedProperty(property) {
	return info.prefix.inline + caplitalizeString(property);
}

/**
 * Checks if a property needs to be prefixed
 * @param {String} property - a style property
 */

function isPrefixProperty(property) {
	return requiredProperties.indexOf(property) > -1;
}

/**
 * Generates an array of all relevant properties according to the userAgent
 * @param {string} userAgent - userAgent which gets used to gather information
 */

function generateRequiredProperties() {
	var userAgent = arguments.length <= 0 || arguments[0] === undefined ? ua : arguments[0];

	requiredProperties = [];
	requiredHacks = [];

	if (userAgent) {
		info = (0, _utilsGetBrowserInfo2['default'])(userAgent);
		var data = _data2['default'][info.browser];

		//only generate if there is browser data provided
		if (data) {
			var property = undefined;
			for (property in data) {
				if (data[property] >= info.version) {
					requiredProperties.push(property);
				}
			}

			//add all required hacks for current browser
			var hack = undefined;
			for (hack in _hacks2['default']) {
				var hackData = _hacks2['default'][hack](info);
				if (hackData) {
					requiredHacks.push(hackData);
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
},{"./data":1,"./hacks":2,"./utils/getBrowserInfo":10,"param-case":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = getBrowserInfo;
var vendorPrefixes = {
	firefox: 'Moz',
	chrome: 'Webkit',
	safari: 'Webkit',
	opera: 'O',
	ie: 'ms'
};

// (C) viazenetti GmbH (Christian Ludwig)
// http://jsfiddle.net/ChristianL/AVyND/

function getBrowserInfo(userAgent) {
	var browser = undefined;
	var version = undefined;
	var verOffset = undefined;

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
	} else {
		browser = '';
		version = 1;
	}

	var prefix = vendorPrefixes[browser] ? vendorPrefixes[browser] : '';
	return {
		browser: browser,
		version: version,
		prefix: {
			inline: prefix,
			css: '-' + prefix.toLowerCase() + '-'
		}
	};
}

module.exports = exports['default'];
},{}],11:[function(require,module,exports){
/**
 * Special language-specific overrides.
 *
 * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
 *
 * @type {Object}
 */
var LANGUAGES = {
  tr: {
    regexp: /\u0130|\u0049|\u0049\u0307/g,
    map: {
      '\u0130': '\u0069',
      '\u0049': '\u0131',
      '\u0049\u0307': '\u0069'
    }
  },
  az: {
    regexp: /[\u0130]/g,
    map: {
      '\u0130': '\u0069',
      '\u0049': '\u0131',
      '\u0049\u0307': '\u0069'
    }
  },
  lt: {
    regexp: /[\u0049\u004A\u012E\u00CC\u00CD\u0128]/g,
    map: {
      '\u0049': '\u0069\u0307',
      '\u004A': '\u006A\u0307',
      '\u012E': '\u012F\u0307',
      '\u00CC': '\u0069\u0307\u0300',
      '\u00CD': '\u0069\u0307\u0301',
      '\u0128': '\u0069\u0307\u0303'
    }
  }
}

/**
 * Lowercase a string.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str, locale) {
  var lang = LANGUAGES[locale]

  str = str == null ? '' : String(str)

  if (lang) {
    str = str.replace(lang.regexp, function (m) { return lang.map[m] })
  }

  return str.toLowerCase()
}

},{}],12:[function(require,module,exports){
var lowerCase = require('lower-case')

var NON_WORD_REGEXP = require('./vendor/non-word-regexp')
var CAMEL_CASE_REGEXP = require('./vendor/camel-case-regexp')
var TRAILING_DIGIT_REGEXP = require('./vendor/trailing-digit-regexp')

/**
 * Sentence case a string.
 *
 * @param  {String} str
 * @param  {String} locale
 * @param  {String} replacement
 * @return {String}
 */
module.exports = function (str, locale, replacement) {
  if (str == null) {
    return ''
  }

  replacement = replacement || ' '

  function replace (match, index, string) {
    if (index === 0 || index === (string.length - match.length)) {
      return ''
    }

    return replacement
  }

  str = String(str)
    // Support camel case ("camelCase" -> "camel Case").
    .replace(CAMEL_CASE_REGEXP, '$1 $2')
    // Support digit groups ("test2012" -> "test 2012").
    .replace(TRAILING_DIGIT_REGEXP, '$1 $2')
    // Remove all non-word characters and replace with a single space.
    .replace(NON_WORD_REGEXP, replace)

  // Lower case the entire string.
  return lowerCase(str, locale)
}

},{"./vendor/camel-case-regexp":13,"./vendor/non-word-regexp":14,"./vendor/trailing-digit-regexp":15,"lower-case":11}],13:[function(require,module,exports){
module.exports = /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g

},{}],14:[function(require,module,exports){
module.exports = /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g

},{}],15:[function(require,module,exports){
module.exports = /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g

},{}],16:[function(require,module,exports){
var sentenceCase = require('sentence-case');

/**
 * Param case a string.
 *
 * @param  {String} string
 * @param  {String} [locale]
 * @return {String}
 */
module.exports = function (string, locale) {
  return sentenceCase(string, locale, '-');
};

},{"sentence-case":12}]},{},[9]);
