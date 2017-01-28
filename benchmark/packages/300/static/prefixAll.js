'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixAll;

var _prefixProperty = require('../utils/prefixProperty');

var _prefixProperty2 = _interopRequireDefault(_prefixProperty);

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _prefixProps = require('./prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _calc = require('./plugins/calc');

var _calc2 = _interopRequireDefault(_calc);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxIE = require('./plugins/flexboxIE');

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = [_position2.default, _calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

function prefixAll(style) {
  for (var property in style) {
    var value = style[property];

    // handle nested objects
    if ((0, _isObject2.default)(value)) {
      style[property] = prefixAll(value);
      // handle array values
    } else if (Array.isArray(value)) {
      var combinedValue = [];

      for (var i = 0, len = value.length; i < len; ++i) {
        var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style);
        (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
      }

      // only modify the value if it was touched
      // by any plugin to prevent unnecessary mutations
      if (combinedValue.length > 0) {
        style[property] = combinedValue;
      }
    } else {
      var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style);

      // only modify the value if it was touched
      // by any plugin to prevent unnecessary mutations
      if (_processedValue) {
        style[property] = _processedValue;
      }

      (0, _prefixProperty2.default)(_prefixProps2.default, property, style);
    }
  }

  return style;
}
module.exports = exports['default'];