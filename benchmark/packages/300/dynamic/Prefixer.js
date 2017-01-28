'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _prefixValue = require('../utils/prefixValue');

var _prefixValue2 = _interopRequireDefault(_prefixValue);

var _getBrowserInformation = require('../utils/getBrowserInformation');

var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

var _getPrefixedKeyframes = require('../utils/getPrefixedKeyframes');

var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);

var _capitalizeString = require('../utils/capitalizeString');

var _capitalizeString2 = _interopRequireDefault(_capitalizeString);

var _addNewValuesOnly = require('../utils/addNewValuesOnly');

var _addNewValuesOnly2 = _interopRequireDefault(_addNewValuesOnly);

var _isObject = require('../utils/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _prefixProps = require('./prefixProps');

var _prefixProps2 = _interopRequireDefault(_prefixProps);

var _prefixAll2 = require('../static/prefixAll');

var _prefixAll3 = _interopRequireDefault(_prefixAll2);

var _calc = require('./plugins/calc');

var _calc2 = _interopRequireDefault(_calc);

var _flex = require('./plugins/flex');

var _flex2 = _interopRequireDefault(_flex);

var _flexboxIE = require('./plugins/flexboxIE');

var _flexboxIE2 = _interopRequireDefault(_flexboxIE);

var _flexboxOld = require('./plugins/flexboxOld');

var _flexboxOld2 = _interopRequireDefault(_flexboxOld);

var _grabCursor = require('./plugins/grabCursor');

var _grabCursor2 = _interopRequireDefault(_grabCursor);

var _gradient = require('./plugins/gradient');

var _gradient2 = _interopRequireDefault(_gradient);

var _position = require('./plugins/position');

var _position2 = _interopRequireDefault(_position);

var _sizing = require('./plugins/sizing');

var _sizing2 = _interopRequireDefault(_sizing);

var _transition = require('./plugins/transition');

var _transition2 = _interopRequireDefault(_transition);

var _zoomCursor = require('./plugins/zoomCursor');

var _zoomCursor2 = _interopRequireDefault(_zoomCursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var plugins = [_position2.default, _calc2.default, _zoomCursor2.default, _grabCursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];

var Prefixer = function () {
  /**
   * Instantiante a new prefixer
   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
   * @param {string} keepUnprefixed - keeps unprefixed properties and values
   */
  function Prefixer() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Prefixer);

    var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

    this._userAgent = options.userAgent || defaultUserAgent;
    this._keepUnprefixed = options.keepUnprefixed || false;

    if (this._userAgent) {
      this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
    }

    // Checks if the userAgent was resolved correctly
    if (this._browserInfo && this._browserInfo.cssPrefix) {
      this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
    } else {
      this._useFallback = true;
      return false;
    }

    var prefixData = this._browserInfo.browserName && _prefixProps2.default[this._browserInfo.browserName];
    if (prefixData) {
      this._requiresPrefix = {};

      for (var property in prefixData) {
        if (prefixData[property] >= this._browserInfo.browserVersion) {
          this._requiresPrefix[property] = true;
        }
      }

      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
    } else {
      this._useFallback = true;
    }

    this._metaData = {
      browserVersion: this._browserInfo.browserVersion,
      browserName: this._browserInfo.browserName,
      cssPrefix: this._browserInfo.cssPrefix,
      jsPrefix: this._browserInfo.jsPrefix,
      keepUnprefixed: this._keepUnprefixed,
      requiresPrefix: this._requiresPrefix
    };
  }

  _createClass(Prefixer, [{
    key: 'prefix',
    value: function prefix(style) {
      // use prefixAll as fallback if userAgent can not be resolved
      if (this._useFallback) {
        return (0, _prefixAll3.default)(style);
      }

      // only add prefixes if needed
      if (!this._hasPropsRequiringPrefix) {
        return style;
      }

      return this._prefixStyle(style);
    }
  }, {
    key: '_prefixStyle',
    value: function _prefixStyle(style) {
      for (var property in style) {
        var value = style[property];

        // handle nested objects
        if ((0, _isObject2.default)(value)) {
          style[property] = this.prefix(value);
          // handle array values
        } else if (Array.isArray(value)) {
          var combinedValue = [];

          for (var i = 0, len = value.length; i < len; ++i) {
            var processedValue = (0, _prefixValue2.default)(plugins, property, value[i], style, this._metaData);
            (0, _addNewValuesOnly2.default)(combinedValue, processedValue || value[i]);
          }

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (combinedValue.length > 0) {
            style[property] = combinedValue;
          }
        } else {
          var _processedValue = (0, _prefixValue2.default)(plugins, property, value, style, this._metaData);

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (_processedValue) {
            style[property] = _processedValue;
          }

          // add prefixes to properties
          if (this._requiresPrefix[property]) {
            style[this._browserInfo.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
            if (!this._keepUnprefixed) {
              delete style[property];
            }
          }
        }
      }

      return style;
    }

    /**
     * Returns a prefixed version of the style object using all vendor prefixes
     * @param {Object} styles - Style object that gets prefixed properties added
     * @returns {Object} - Style object with prefixed properties and values
     */

  }], [{
    key: 'prefixAll',
    value: function prefixAll(styles) {
      return (0, _prefixAll3.default)(styles);
    }
  }]);

  return Prefixer;
}();

exports.default = Prefixer;
module.exports = exports['default'];