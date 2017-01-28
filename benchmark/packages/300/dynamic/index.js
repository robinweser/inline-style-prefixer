'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createPrefixer = require('./createPrefixer');

var _createPrefixer2 = _interopRequireDefault(_createPrefixer);

var _propertyPrefixMap = require('./propertyPrefixMap');

var _propertyPrefixMap2 = _interopRequireDefault(_propertyPrefixMap);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _static = require('../static');

var _static2 = _interopRequireDefault(_static);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createPrefixer2.default)(_propertyPrefixMap2.default, _plugins2.default, _static2.default);
module.exports = exports['default'];