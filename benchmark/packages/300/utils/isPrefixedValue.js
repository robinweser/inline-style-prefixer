'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isPrefixedValue;
var regex = /-webkit-|-moz-|-ms-/;
function isPrefixedValue(value) {
  if (Array.isArray(value)) {
    value = value.join(',');
  }

  return value.match(regex) !== null;
}
module.exports = exports['default'];