'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unprefixProperty;

var _isPrefixedProperty = require('./isPrefixedProperty');

var _isPrefixedProperty2 = _interopRequireDefault(_isPrefixedProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var regex = /^(Webkit|Moz|O|ms)/;
function unprefixProperty(property) {
  if ((0, _isPrefixedProperty2.default)(property)) {
    var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
    return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
  }
  return property;
}
module.exports = exports['default'];