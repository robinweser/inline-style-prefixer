'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixProperty;

var _capitalizeString = require('./capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prefixProperty(prefixProperties, property, style) {
  if (!prefixProperties.hasOwnProperty(property)) {
    return style;
  }

  // We need to preserve the order of the styles while inserting new prefixed
  // styles. Object order is not guaranteed, but this is better than nothing.
  // Note that this is brittle and is likely to break in older versions of
  // Node (e.g. Node 4).
  var newStyle = {};
  Object.keys(style).forEach(function (styleProperty) {
    if (styleProperty === property) {
      // We've found the style we need to prefix.
      var requiredPrefixes = prefixProperties[property];
      for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
        newStyle[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
      }
    }

    newStyle[styleProperty] = style[styleProperty];
  });

  return newStyle;
}
module.exports = exports['default'];