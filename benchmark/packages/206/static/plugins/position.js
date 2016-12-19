'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = position;
function position(property, value, style) {
  if (property === 'position' && value === 'sticky') {
    style.position = ['-webkit-sticky', 'sticky'];
  }
}
module.exports = exports['default'];