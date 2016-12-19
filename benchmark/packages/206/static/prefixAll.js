'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prefixAll;

var _capitalizeString = require('../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _prefixProps = require('./prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _calc = require('./plugins/calc');

var _calc2 = _interopRequireDefault(_calc);

var _cursor = require('./plugins/cursor');

var _cursor2 = _interopRequireDefault(_cursor);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

var _flexboxIE = require('./plugins/flexboxIE');

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// special flexbox specifications


var plugins = [_position2.default, _calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

function runPluginsOnValue(property, value, style, callback) {
  var callbackCalled = false;

  for (var i = 0, len = plugins.length; i < len; ++i) {
    var newValue = plugins[i](property, value, style);

    if (newValue) {
      callbackCalled = true;
      callback(newValue);
    }
  }

  return callbackCalled;
}

function prefixAll(style) {
  var _loop = function _loop(property) {
    var value = style[property];
    if (value instanceof Object && !Array.isArray(value)) {
      style[property] = prefixAll(value);
    } else {
      if (Array.isArray(value)) {
        (function () {
          var combinedValue = [];

          for (var i = 0, len = value.length; i < len; ++i) {
            var called = runPluginsOnValue(property, value[i], style, function (newValue) {
              [].concat(newValue).forEach(function (val) {
                if (combinedValue.indexOf(val) === -1) {
                  combinedValue.push(val);
                }
              });
            });

            if (!called && combinedValue.indexOf(value[i]) === -1) {
              combinedValue.push(value[i]);
            }
          }

          style[property] = combinedValue;
        })();
      } else {
        runPluginsOnValue(property, value, style, function (newValue) {
          style[property] = newValue;
        });
      }

      var requiredPrefixes = _prefixProps2.default[property];
      if (requiredPrefixes) {
        for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
          style[requiredPrefixes[i] + (0, _capitalizeString2.default)(property)] = style[property];
        }
      }
    }
  };

  for (var property in style) {
    _loop(property);
  }

  return style;
}
module.exports = exports['default'];