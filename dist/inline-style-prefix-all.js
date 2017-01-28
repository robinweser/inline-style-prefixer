(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.InlineStylePrefixAll = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};

  babelHelpers.classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  babelHelpers.createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  babelHelpers;


  var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function prefixProperty(prefixProperties, property, style) {
    var requiredPrefixes = prefixProperties[property];

    if (requiredPrefixes) {
      for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
        style[requiredPrefixes[i] + capitalizeString(property)] = style[property];
      }
    }
  }

  function prefixValue(plugins, property, value, style, metaData) {
    for (var i = 0, len = plugins.length; i < len; ++i) {
      var processedValue = plugins[i](property, value, style, metaData);

      // we can stop processing if a value is returned
      // as all plugin criteria are unique
      if (processedValue) {
        return processedValue;
      }
    }
  }

  function addIfNew(list, value) {
    if (list.indexOf(value) === -1) {
      list.push(value);
    }
  }

  function addNewValuesOnly(list, values) {
    if (Array.isArray(values)) {
      for (var i = 0, len = values.length; i < len; ++i) {
        addIfNew(list, values[i]);
      }
    } else {
      addIfNew(list, values);
    }
  }

  function isObject(value) {
    return value instanceof Object && !Array.isArray(value);
  }

  function createPrefixer(propertyPrefixMap) {
    var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    function prefixAll(style) {
      for (var property in style) {
        var value = style[property];

        // handle nested objects
        if (isObject(value)) {
          style[property] = prefixAll(value);
          // handle array values
        } else if (Array.isArray(value)) {
          var combinedValue = [];

          for (var i = 0, len = value.length; i < len; ++i) {
            var processedValue = prefixValue(plugins, property, value[i], style, propertyPrefixMap);
            addNewValuesOnly(combinedValue, processedValue || value[i]);
          }

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (combinedValue.length > 0) {
            style[property] = combinedValue;
          }
        } else {
          var _processedValue = prefixValue(plugins, property, value, style, propertyPrefixMap);

          // only modify the value if it was touched
          // by any plugin to prevent unnecessary mutations
          if (_processedValue) {
            style[property] = _processedValue;
          }

          prefixProperty(propertyPrefixMap, property, style);
        }
      }

      return style;
    }

    return prefixAll;
  }

  var propertyPrefixMap = { "appearance": ["Webkit", "Moz"], "userSelect": ["Webkit", "Moz", "ms"], "textEmphasisPosition": ["Webkit"], "textEmphasis": ["Webkit"], "textEmphasisStyle": ["Webkit"], "textEmphasisColor": ["Webkit"], "boxDecorationBreak": ["Webkit"], "clipPath": ["Webkit"], "maskImage": ["Webkit"], "maskMode": ["Webkit"], "maskRepeat": ["Webkit"], "maskPosition": ["Webkit"], "maskClip": ["Webkit"], "maskOrigin": ["Webkit"], "maskSize": ["Webkit"], "maskComposite": ["Webkit"], "mask": ["Webkit"], "maskBorderSource": ["Webkit"], "maskBorderMode": ["Webkit"], "maskBorderSlice": ["Webkit"], "maskBorderWidth": ["Webkit"], "maskBorderOutset": ["Webkit"], "maskBorderRepeat": ["Webkit"], "maskBorder": ["Webkit"], "maskType": ["Webkit"], "textDecorationStyle": ["Webkit", "Moz"], "textDecorationSkip": ["Webkit", "Moz"], "textDecorationLine": ["Webkit", "Moz"], "textDecorationColor": ["Webkit", "Moz"], "filter": ["Webkit"], "fontFeatureSettings": ["Webkit", "Moz"], "breakAfter": ["Webkit", "Moz", "ms"], "breakBefore": ["Webkit", "Moz", "ms"], "breakInside": ["Webkit", "Moz", "ms"], "columnCount": ["Webkit", "Moz"], "columnFill": ["Webkit", "Moz"], "columnGap": ["Webkit", "Moz"], "columnRule": ["Webkit", "Moz"], "columnRuleColor": ["Webkit", "Moz"], "columnRuleStyle": ["Webkit", "Moz"], "columnRuleWidth": ["Webkit", "Moz"], "columns": ["Webkit", "Moz"], "columnSpan": ["Webkit", "Moz"], "columnWidth": ["Webkit", "Moz"], "flex": ["Webkit", "Moz"], "flexBasis": ["Webkit"], "flexDirection": ["Webkit"], "flexGrow": ["Webkit"], "flexFlow": ["Webkit", "Moz"], "flexShrink": ["Webkit"], "flexWrap": ["Webkit", "Moz"], "alignContent": ["Webkit"], "alignItems": ["Webkit"], "alignSelf": ["Webkit"], "justifyContent": ["Webkit"], "order": ["Webkit"], "transform": ["Webkit", "Moz"], "transformOrigin": ["Webkit", "Moz"], "transformOriginX": ["Webkit", "Moz"], "transformOriginY": ["Webkit", "Moz"], "backfaceVisibility": ["Webkit", "Moz"], "perspective": ["Webkit", "Moz"], "perspectiveOrigin": ["Webkit", "Moz"], "transformStyle": ["Webkit", "Moz"], "transformOriginZ": ["Webkit", "Moz"], "animation": ["Webkit", "Moz"], "animationDelay": ["Webkit", "Moz"], "animationDirection": ["Webkit", "Moz"], "animationFillMode": ["Webkit", "Moz"], "animationDuration": ["Webkit", "Moz"], "animationIterationCount": ["Webkit", "Moz"], "animationName": ["Webkit", "Moz"], "animationPlayState": ["Webkit", "Moz"], "animationTimingFunction": ["Webkit", "Moz"], "backdropFilter": ["Webkit"], "fontKerning": ["Webkit"], "scrollSnapType": ["Webkit", "ms"], "scrollSnapPointsX": ["Webkit", "ms"], "scrollSnapPointsY": ["Webkit", "ms"], "scrollSnapDestination": ["Webkit", "ms"], "scrollSnapCoordinate": ["Webkit", "ms"], "shapeImageThreshold": ["Webkit"], "shapeImageMargin": ["Webkit"], "shapeImageOutside": ["Webkit"], "hyphens": ["Webkit", "Moz", "ms"], "flowInto": ["Webkit", "ms"], "flowFrom": ["Webkit", "ms"], "regionFragment": ["Webkit", "ms"], "borderRadius": ["Moz"], "borderImage": ["Moz"], "borderImageOutset": ["Moz"], "borderImageRepeat": ["Moz"], "borderImageSlice": ["Moz"], "borderImageSource": ["Moz"], "borderImageWidth": ["Moz"], "transitionDelay": ["Moz", "Webkit"], "transitionDuration": ["Moz", "Webkit"], "transitionProperty": ["Moz", "Webkit"], "transitionTimingFunction": ["Moz", "Webkit"], "boxSizing": ["Moz"], "textAlignLast": ["Moz"], "tabSize": ["Moz"], "resize": ["Moz"], "backgroundClip": ["Moz"], "backgroundOrigin": ["Moz"], "backgroundSize": ["Moz"], "boxShadow": ["Moz"], "wrapFlow": ["ms"], "wrapThrough": ["ms"], "wrapMargin": ["ms"], "gridTemplateColumns": ["ms"], "gridTemplateRows": ["ms"], "gridTemplateAreas": ["ms"], "gridTemplate": ["ms"], "gridAutoColumns": ["ms"], "gridAutoRows": ["ms"], "gridAutoFlow": ["ms"], "grid": ["ms"], "gridRowStart": ["ms"], "gridColumnStart": ["ms"], "gridRowEnd": ["ms"], "gridRow": ["ms"], "gridColumn": ["ms"], "gridColumnEnd": ["ms"], "gridColumnGap": ["ms"], "gridRowGap": ["ms"], "gridArea": ["ms"], "gridGap": ["ms"], "textSizeAdjust": ["Webkit", "ms"] };

  var regex = /-webkit-|-moz-|-ms-/;
  function isPrefixedValue(value) {
    if (Array.isArray(value)) {
      value = value.join(',');
    }

    return value.match(regex) !== null;
  }

  var prefixes = ['-webkit-', '-moz-', ''];

  function calc(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('calc(') > -1) {
      return prefixes.map(function (prefix) {
        return value.replace(/calc\(/g, prefix + 'calc(');
      });
    }
  }

  var prefixes$1 = ['-webkit-', '-moz-', ''];

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values[value]) {
      return prefixes$1.map(function (prefix) {
        return prefix + value;
      });
    }
  }

  // http://caniuse.com/#search=cross-fade
  var prefixes$2 = ['-webkit-', ''];

  function crossFade(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('cross-fade(') > -1) {
      return prefixes$2.map(function (prefix) {
        return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
      });
    }
  }

  // http://caniuse.com/#feat=css-filter-function
  var prefixes$3 = ['-webkit-', ''];

  function filter(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('filter(') > -1) {
      return prefixes$3.map(function (prefix) {
        return value.replace(/filter\(/g, prefix + 'filter(');
      });
    }
  }

  var values$1 = {
    flex: true,
    'inline-flex': true
  };

  function flex(property, value) {
    if (property === 'display' && values$1[value]) {
      return ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value];
    }
  }

  var alternativeValues = {
    'space-around': 'distribute',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end'
  };
  var alternativeProps = {
    alignContent: 'msFlexLinePack',
    alignSelf: 'msFlexItemAlign',
    alignItems: 'msFlexAlign',
    justifyContent: 'msFlexPack',
    order: 'msFlexOrder',
    flexGrow: 'msFlexPositive',
    flexShrink: 'msFlexNegative',
    flexBasis: 'msPreferredSize'
  };

  function flexboxIE(property, value, style) {
    if (alternativeProps[property]) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }

  var alternativeValues$1 = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple'
  };

  var alternativeProps$1 = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };

  function flexboxOld(property, value, style) {
    if (property === 'flexDirection' && typeof value === 'string') {
      if (value.indexOf('column') > -1) {
        style.WebkitBoxOrient = 'vertical';
      } else {
        style.WebkitBoxOrient = 'horizontal';
      }
      if (value.indexOf('reverse') > -1) {
        style.WebkitBoxDirection = 'reverse';
      } else {
        style.WebkitBoxDirection = 'normal';
      }
    }
    if (alternativeProps$1[property]) {
      style[alternativeProps$1[property]] = alternativeValues$1[value] || value;
    }
  }

  var prefixes$4 = ['-webkit-', '-moz-', ''];
  var values$2 = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.match(values$2) !== null) {
      return prefixes$4.map(function (prefix) {
        return prefix + value;
      });
    }
  }

  // http://caniuse.com/#feat=css-image-set
  var prefixes$5 = ['-webkit-', ''];

  function imageSet(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('image-set(') > -1) {
      return prefixes$5.map(function (prefix) {
        return value.replace(/image-set\(/g, prefix + 'image-set(');
      });
    }
  }

  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return ['-webkit-sticky', 'sticky'];
    }
  }

  var prefixes$6 = ['-webkit-', '-moz-', ''];

  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values$3 = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };

  function sizing(property, value) {
    if (properties[property] && values$3[value]) {
      return prefixes$6.map(function (prefix) {
        return prefix + value;
      });
    }
  }

  var index$1 = __commonjs(function (module) {
  'use strict';

  var uppercasePattern = /[A-Z]/g;
  var msPattern = /^ms-/;
  var cache = {};

  function hyphenateStyleName(string) {
    return string in cache ? cache[string] : cache[string] = string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
  }

  module.exports = hyphenateStyleName;
  });

  var hyphenateStyleName = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

  var properties$1 = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true,
    MozTransition: true,
    MozTransitionProperty: true
  };

  var prefixMapping = {
    Webkit: '-webkit-',
    Moz: '-moz-',
    ms: '-ms-'
  };

  function prefixValue$1(value, propertyPrefixMap) {
    if (isPrefixedValue(value)) {
      return value;
    }

    // only split multi values, not cubic beziers
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

    for (var i = 0, len = multipleValues.length; i < len; ++i) {
      var singleValue = multipleValues[i];
      var values = [singleValue];
      for (var property in propertyPrefixMap) {
        var dashCaseProperty = hyphenateStyleName(property);

        if (singleValue.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
          var prefixes = propertyPrefixMap[property];
          for (var j = 0, pLen = prefixes.length; j < pLen; ++j) {
            // join all prefixes and create a new value
            values.unshift(singleValue.replace(dashCaseProperty, prefixMapping[prefixes[j]] + dashCaseProperty));
          }
        }
      }

      multipleValues[i] = values.join(',');
    }

    return multipleValues.join(',');
  }

  function transition(property, value, style, propertyPrefixMap) {
    // also check for already prefixed transitions
    if (typeof value === 'string' && properties$1[property]) {
      var outputValue = prefixValue$1(value, propertyPrefixMap);
      // if the property is already prefixed
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return val.match(/-moz-|-ms-/) === null;
      }).join(',');

      if (property.indexOf('Webkit') > -1) {
        return webkitOutput;
      }

      var mozOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function (val) {
        return val.match(/-webkit-|-ms-/) === null;
      }).join(',');

      if (property.indexOf('Moz') > -1) {
        return mozOutput;
      }

      style['Webkit' + capitalizeString(property)] = webkitOutput;
      style['Moz' + capitalizeString(property)] = mozOutput;
      return outputValue;
    }
  }

  var plugins = [position, calc, imageSet, crossFade, filter, cursor, sizing, gradient, transition, flexboxIE, flexboxOld, flex];

  var index = createPrefixer(propertyPrefixMap, plugins);

  return index;

}));
//# sourceMappingURL=inline-style-prefix-all.js.map