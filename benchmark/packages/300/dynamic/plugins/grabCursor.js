'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = grabCursor;

var _getPrefixedValue = require('../../utils/getPrefixedValue');

var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = {
  grab: true,
  grabbing: true
};
function grabCursor(property, value, style, _ref) {
  var browserName = _ref.browserName,
      cssPrefix = _ref.cssPrefix,
      keepUnprefixed = _ref.keepUnprefixed;

  // adds prefixes for firefox, chrome, safari, and opera regardless of
  // version until a reliable brwoser support info can be found
  // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
  if (property === 'cursor' && values[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
    return (0, _getPrefixedValue2.default)(cssPrefix + value, value, keepUnprefixed);
  }
}
module.exports = exports['default'];