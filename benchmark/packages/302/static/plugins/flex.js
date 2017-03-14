'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = flex;
var values = {
  flex: true,
  'inline-flex': true
};

function flex(property, value) {
  if (property === 'display' && values.hasOwnProperty(value)) {
    return ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value];
  }
}
module.exports = exports['default'];