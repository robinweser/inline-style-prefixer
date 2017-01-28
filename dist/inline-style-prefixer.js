(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.InlineStylePrefixer = factory());
}(this, function () { 'use strict';

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var bowser = __commonjs(function (module, exports, global) {
  /*!
   * Bowser - a browser detector
   * https://github.com/ded/bowser
   * MIT License | (c) Dustin Diaz 2015
   */

  !function (root, name, definition) {
    if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (typeof define == 'function' && define.amd) define(name, definition);else root[name] = definition();
  }(__commonjs_global, 'bowser', function () {
    /**
      * See useragents.js for examples of navigator.userAgent
      */

    var t = true;

    function detect(ua) {

      function getFirstMatch(regex) {
        var match = ua.match(regex);
        return match && match.length > 1 && match[1] || '';
      }

      function getSecondMatch(regex) {
        var match = ua.match(regex);
        return match && match.length > 1 && match[2] || '';
      }

      var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
          likeAndroid = /like android/i.test(ua),
          android = !likeAndroid && /android/i.test(ua),
          nexusMobile = /nexus\s*[0-6]\s*/i.test(ua),
          nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua),
          chromeos = /CrOS/.test(ua),
          silk = /silk/i.test(ua),
          sailfish = /sailfish/i.test(ua),
          tizen = /tizen/i.test(ua),
          webos = /(web|hpw)os/i.test(ua),
          windowsphone = /windows phone/i.test(ua),
          samsungBrowser = /SamsungBrowser/i.test(ua),
          windows = !windowsphone && /windows/i.test(ua),
          mac = !iosdevice && !silk && /macintosh/i.test(ua),
          linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua),
          edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
          versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
          tablet = /tablet/i.test(ua),
          mobile = !tablet && /[^-]mobi/i.test(ua),
          xbox = /xbox/i.test(ua),
          result;

      if (/opera/i.test(ua)) {
        //  an old Opera
        result = {
          name: 'Opera',
          opera: t,
          version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/opr|opios/i.test(ua)) {
        // a new Opera
        result = {
          name: 'Opera',
          opera: t,
          version: getFirstMatch(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier
        };
      } else if (/SamsungBrowser/i.test(ua)) {
        result = {
          name: 'Samsung Internet for Android',
          samsungBrowser: t,
          version: versionIdentifier || getFirstMatch(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/coast/i.test(ua)) {
        result = {
          name: 'Opera Coast',
          coast: t,
          version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/yabrowser/i.test(ua)) {
        result = {
          name: 'Yandex Browser',
          yandexbrowser: t,
          version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/ucbrowser/i.test(ua)) {
        result = {
          name: 'UC Browser',
          ucbrowser: t,
          version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/mxios/i.test(ua)) {
        result = {
          name: 'Maxthon',
          maxthon: t,
          version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/epiphany/i.test(ua)) {
        result = {
          name: 'Epiphany',
          epiphany: t,
          version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/puffin/i.test(ua)) {
        result = {
          name: 'Puffin',
          puffin: t,
          version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
        };
      } else if (/sleipnir/i.test(ua)) {
        result = {
          name: 'Sleipnir',
          sleipnir: t,
          version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/k-meleon/i.test(ua)) {
        result = {
          name: 'K-Meleon',
          kMeleon: t,
          version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (windowsphone) {
        result = {
          name: 'Windows Phone',
          windowsphone: t
        };
        if (edgeVersion) {
          result.msedge = t;
          result.version = edgeVersion;
        } else {
          result.msie = t;
          result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
        }
      } else if (/msie|trident/i.test(ua)) {
        result = {
          name: 'Internet Explorer',
          msie: t,
          version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
        };
      } else if (chromeos) {
        result = {
          name: 'Chrome',
          chromeos: t,
          chromeBook: t,
          chrome: t,
          version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        };
      } else if (/chrome.+? edge/i.test(ua)) {
        result = {
          name: 'Microsoft Edge',
          msedge: t,
          version: edgeVersion
        };
      } else if (/vivaldi/i.test(ua)) {
        result = {
          name: 'Vivaldi',
          vivaldi: t,
          version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
        };
      } else if (sailfish) {
        result = {
          name: 'Sailfish',
          sailfish: t,
          version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
        };
      } else if (/seamonkey\//i.test(ua)) {
        result = {
          name: 'SeaMonkey',
          seamonkey: t,
          version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
        };
      } else if (/firefox|iceweasel|fxios/i.test(ua)) {
        result = {
          name: 'Firefox',
          firefox: t,
          version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
        };
        if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
          result.firefoxos = t;
        }
      } else if (silk) {
        result = {
          name: 'Amazon Silk',
          silk: t,
          version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
        };
      } else if (/phantom/i.test(ua)) {
        result = {
          name: 'PhantomJS',
          phantom: t,
          version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
        };
      } else if (/slimerjs/i.test(ua)) {
        result = {
          name: 'SlimerJS',
          slimer: t,
          version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
        };
      } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
        result = {
          name: 'BlackBerry',
          blackberry: t,
          version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
        };
      } else if (webos) {
        result = {
          name: 'WebOS',
          webos: t,
          version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
        };
        /touchpad\//i.test(ua) && (result.touchpad = t);
      } else if (/bada/i.test(ua)) {
        result = {
          name: 'Bada',
          bada: t,
          version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
        };
      } else if (tizen) {
        result = {
          name: 'Tizen',
          tizen: t,
          version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
        };
      } else if (/qupzilla/i.test(ua)) {
        result = {
          name: 'QupZilla',
          qupzilla: t,
          version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
        };
      } else if (/chromium/i.test(ua)) {
        result = {
          name: 'Chromium',
          chromium: t,
          version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
        };
      } else if (/chrome|crios|crmo/i.test(ua)) {
        result = {
          name: 'Chrome',
          chrome: t,
          version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        };
      } else if (android) {
        result = {
          name: 'Android',
          version: versionIdentifier
        };
      } else if (/safari|applewebkit/i.test(ua)) {
        result = {
          name: 'Safari',
          safari: t
        };
        if (versionIdentifier) {
          result.version = versionIdentifier;
        }
      } else if (iosdevice) {
        result = {
          name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
        };
        // WTF: version is not part of user agent in web apps
        if (versionIdentifier) {
          result.version = versionIdentifier;
        }
      } else if (/googlebot/i.test(ua)) {
        result = {
          name: 'Googlebot',
          googlebot: t,
          version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
        };
      } else {
        result = {
          name: getFirstMatch(/^(.*)\/(.*) /),
          version: getSecondMatch(/^(.*)\/(.*) /)
        };
      }

      // set webkit or gecko flag for browsers based on these engines
      if (!result.msedge && /(apple)?webkit/i.test(ua)) {
        if (/(apple)?webkit\/537\.36/i.test(ua)) {
          result.name = result.name || "Blink";
          result.blink = t;
        } else {
          result.name = result.name || "Webkit";
          result.webkit = t;
        }
        if (!result.version && versionIdentifier) {
          result.version = versionIdentifier;
        }
      } else if (!result.opera && /gecko\//i.test(ua)) {
        result.name = result.name || "Gecko";
        result.gecko = t;
        result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
      }

      // set OS flags for platforms that have multiple browsers
      if (!result.windowsphone && !result.msedge && (android || result.silk)) {
        result.android = t;
      } else if (!result.windowsphone && !result.msedge && iosdevice) {
        result[iosdevice] = t;
        result.ios = t;
      } else if (mac) {
        result.mac = t;
      } else if (xbox) {
        result.xbox = t;
      } else if (windows) {
        result.windows = t;
      } else if (linux) {
        result.linux = t;
      }

      // OS version extraction
      var osVersion = '';
      if (result.windowsphone) {
        osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
      } else if (iosdevice) {
        osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
        osVersion = osVersion.replace(/[_\s]/g, '.');
      } else if (android) {
        osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
      } else if (result.webos) {
        osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
      } else if (result.blackberry) {
        osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
      } else if (result.bada) {
        osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
      } else if (result.tizen) {
        osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
      }
      if (osVersion) {
        result.osversion = osVersion;
      }

      // device type extraction
      var osMajorVersion = osVersion.split('.')[0];
      if (tablet || nexusTablet || iosdevice == 'ipad' || android && (osMajorVersion == 3 || osMajorVersion >= 4 && !mobile) || result.silk) {
        result.tablet = t;
      } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || nexusMobile || result.blackberry || result.webos || result.bada) {
        result.mobile = t;
      }

      // Graded Browser Support
      // http://developer.yahoo.com/yui/articles/gbs
      if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.vivaldi && result.version >= 1.0 || result.chrome && result.version >= 20 || result.samsungBrowser && result.version >= 4 || result.firefox && result.version >= 20.0 || result.safari && result.version >= 6 || result.opera && result.version >= 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] >= 6 || result.blackberry && result.version >= 10.1 || result.chromium && result.version >= 20) {
        result.a = t;
      } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20.0 || result.safari && result.version < 6 || result.opera && result.version < 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] < 6 || result.chromium && result.version < 20) {
        result.c = t;
      } else result.x = t;

      return result;
    }

    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent || '' : '');

    bowser.test = function (browserList) {
      for (var i = 0; i < browserList.length; ++i) {
        var browserItem = browserList[i];
        if (typeof browserItem === 'string') {
          if (browserItem in bowser) {
            return true;
          }
        }
      }
      return false;
    };

    /**
     * Get version precisions count
     *
     * @example
     *   getVersionPrecision("1.10.3") // 3
     *
     * @param  {string} version
     * @return {number}
     */
    function getVersionPrecision(version) {
      return version.split(".").length;
    }

    /**
     * Array::map polyfill
     *
     * @param  {Array} arr
     * @param  {Function} iterator
     * @return {Array}
     */
    function map(arr, iterator) {
      var result = [],
          i;
      if (Array.prototype.map) {
        return Array.prototype.map.call(arr, iterator);
      }
      for (i = 0; i < arr.length; i++) {
        result.push(iterator(arr[i]));
      }
      return result;
    }

    /**
     * Calculate browser version weight
     *
     * @example
     *   compareVersions(['1.10.2.1',  '1.8.2.1.90'])    // 1
     *   compareVersions(['1.010.2.1', '1.09.2.1.90']);  // 1
     *   compareVersions(['1.10.2.1',  '1.10.2.1']);     // 0
     *   compareVersions(['1.10.2.1',  '1.0800.2']);     // -1
     *
     * @param  {Array<String>} versions versions to compare
     * @return {Number} comparison result
     */
    function compareVersions(versions) {
      // 1) get common precision for both versions, for example for "10.0" and "9" it should be 2
      var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
      var chunks = map(versions, function (version) {
        var delta = precision - getVersionPrecision(version);

        // 2) "9" -> "9.0" (for precision = 2)
        version = version + new Array(delta + 1).join(".0");

        // 3) "9.0" -> ["000000000"", "000000009"]
        return map(version.split("."), function (chunk) {
          return new Array(20 - chunk.length).join("0") + chunk;
        }).reverse();
      });

      // iterate in reverse order by reversed chunks array
      while (--precision >= 0) {
        // 4) compare: "000000009" > "000000010" = false (but "9" > "10" = true)
        if (chunks[0][precision] > chunks[1][precision]) {
          return 1;
        } else if (chunks[0][precision] === chunks[1][precision]) {
          if (precision === 0) {
            // all version chunks are same
            return 0;
          }
        } else {
          return -1;
        }
      }
    }

    /**
     * Check if browser is unsupported
     *
     * @example
     *   bowser.isUnsupportedBrowser({
     *     msie: "10",
     *     firefox: "23",
     *     chrome: "29",
     *     safari: "5.1",
     *     opera: "16",
     *     phantom: "534"
     *   });
     *
     * @param  {Object}  minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function isUnsupportedBrowser(minVersions, strictMode, ua) {
      var _bowser = bowser;

      // make strictMode param optional with ua param usage
      if (typeof strictMode === 'string') {
        ua = strictMode;
        strictMode = void 0;
      }

      if (strictMode === void 0) {
        strictMode = false;
      }
      if (ua) {
        _bowser = detect(ua);
      }

      var version = "" + _bowser.version;
      for (var browser in minVersions) {
        if (minVersions.hasOwnProperty(browser)) {
          if (_bowser[browser]) {
            if (typeof minVersions[browser] !== 'string') {
              throw new Error('Browser version in the minVersion map should be a string: ' + browser + ': ' + String(minVersions));
            }

            // browser version and min supported version.
            return compareVersions([version, minVersions[browser]]) < 0;
          }
        }
      }

      return strictMode; // not found
    }

    /**
     * Check if browser is supported
     *
     * @param  {Object} minVersions map of minimal version to browser
     * @param  {Boolean} [strictMode = false] flag to return false if browser wasn't found in map
     * @param  {String}  [ua] user agent string
     * @return {Boolean}
     */
    function check(minVersions, strictMode, ua) {
      return !isUnsupportedBrowser(minVersions, strictMode, ua);
    }

    bowser.isUnsupportedBrowser = isUnsupportedBrowser;
    bowser.compareVersions = compareVersions;
    bowser.check = check;

    /*
     * Set our detect method to the main bowser object so we can
     * reuse it to test other user agents.
     * This is needed to implement future tests.
     */
    bowser._detect = detect;

    return bowser;
  });
  });

  var bowser$1 = (bowser && typeof bowser === 'object' && 'default' in bowser ? bowser['default'] : bowser);

  var prefixByBrowser = {
    chrome: 'Webkit',
    safari: 'Webkit',
    ios: 'Webkit',
    android: 'Webkit',
    phantom: 'Webkit',
    opera: 'Webkit',
    webos: 'Webkit',
    blackberry: 'Webkit',
    bada: 'Webkit',
    tizen: 'Webkit',
    chromium: 'Webkit',
    vivaldi: 'Webkit',
    firefox: 'Moz',
    seamoney: 'Moz',
    sailfish: 'Moz',
    msie: 'ms',
    msedge: 'ms'
  };

  var browserByCanIuseAlias = {
    chrome: 'chrome',
    chromium: 'chrome',
    safari: 'safari',
    firfox: 'firefox',
    msedge: 'edge',
    opera: 'opera',
    vivaldi: 'opera',
    msie: 'ie'
  };

  function getBrowserName(browserInfo) {
    if (browserInfo.firefox) {
      return 'firefox';
    }

    if (browserInfo.mobile || browserInfo.tablet) {
      if (browserInfo.ios) {
        return 'ios_saf';
      } else if (browserInfo.android) {
        return 'android';
      } else if (browserInfo.opera) {
        return 'op_mini';
      }
    }

    for (var browser in browserByCanIuseAlias) {
      if (browserInfo[browser]) {
        return browserByCanIuseAlias[browser];
      }
    }
  }

  /**
   * Uses bowser to get default browser browserInformation such as version and name
   * Evaluates bowser browserInfo and adds vendorPrefix browserInformation
   * @param {string} userAgent - userAgent that gets evaluated
   */
  function getBrowserInformation(userAgent) {
    var browserInfo = bowser$1._detect(userAgent);

    for (var browser in prefixByBrowser) {
      if (browserInfo[browser]) {
        var prefix = prefixByBrowser[browser];

        browserInfo.jsPrefix = prefix;
        browserInfo.cssPrefix = '-' + prefix.toLowerCase() + '-';
        break;
      }
    }

    browserInfo.browserName = getBrowserName(browserInfo);

    // For cordova IOS 8 the version is missing, set truncated osversion to prevent NaN
    if (browserInfo.version) {
      browserInfo.browserVersion = parseFloat(browserInfo.version);
    } else {
      browserInfo.browserVersion = parseInt(parseFloat(browserInfo.osversion), 10);
    }

    browserInfo.osVersion = parseFloat(browserInfo.osversion);

    // iOS forces all browsers to use Safari under the hood
    // as the Safari version seems to match the iOS version
    // we just explicitely use the osversion instead
    // https://github.com/rofrischmann/inline-style-prefixer/issues/72
    if (browserInfo.browserName === 'ios_saf' && browserInfo.browserVersion > browserInfo.osVersion) {
      browserInfo.browserVersion = browserInfo.osVersion;
    }

    // seperate native android chrome
    // https://github.com/rofrischmann/inline-style-prefixer/issues/45
    if (browserInfo.browserName === 'android' && browserInfo.chrome && browserInfo.browserVersion > 37) {
      browserInfo.browserName = 'and_chr';
    }

    // For android < 4.4 we want to check the osversion
    // not the chrome version, see issue #26
    // https://github.com/rofrischmann/inline-style-prefixer/issues/26
    if (browserInfo.browserName === 'android' && browserInfo.osVersion < 5) {
      browserInfo.browserVersion = browserInfo.osVersion;
    }

    // Samsung browser are basically build on Chrome > 44
    // https://github.com/rofrischmann/inline-style-prefixer/issues/102
    if (browserInfo.browserName === 'android' && browserInfo.samsungBrowser) {
      browserInfo.browserName = 'and_chr';
      browserInfo.browserVersion = 44;
    }

    return browserInfo;
  }

  function getPrefixedKeyframes(browserName, browserVersion, cssPrefix) {
    var prefixedKeyframes = 'keyframes';

    if (browserName === 'chrome' && browserVersion < 43 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 || browserName === 'opera' && browserVersion < 30 || browserName === 'android' && browserVersion <= 4.4 || browserName === 'and_uc') {
      return cssPrefix + prefixedKeyframes;
    }
    return prefixedKeyframes;
  }

  function capitalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

  function createPrefixer(propertyPrefixMap) {
    var plugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (style) {
      return style;
    };

    return function () {
      /**
      * Instantiante a new prefixer
      * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
      * @param {string} keepUnprefixed - keeps unprefixed properties and values
      */
      function Prefixer() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        babelHelpers.classCallCheck(this, Prefixer);

        var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

        this._userAgent = options.userAgent || defaultUserAgent;
        this._keepUnprefixed = options.keepUnprefixed || false;

        if (this._userAgent) {
          this._browserInfo = getBrowserInformation(this._userAgent);
        }

        // Checks if the userAgent was resolved correctly
        if (this._browserInfo && this._browserInfo.cssPrefix) {
          this.prefixedKeyframes = getPrefixedKeyframes(this._browserInfo.browserName, this._browserInfo.browserVersion, this._browserInfo.cssPrefix);
        } else {
          this._useFallback = true;
          return false;
        }

        var prefixData = this._browserInfo.browserName && propertyPrefixMap[this._browserInfo.browserName];
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

      babelHelpers.createClass(Prefixer, [{
        key: 'prefix',
        value: function prefix(style) {
          // use static prefixer as fallback if userAgent can not be resolved
          if (this._useFallback) {
            return fallback(style);
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
            if (isObject(value)) {
              style[property] = this.prefix(value);
              // handle array values
            } else if (Array.isArray(value)) {
              var combinedValue = [];

              for (var i = 0, len = value.length; i < len; ++i) {
                var processedValue = prefixValue(plugins, property, value[i], style, this._metaData);
                addNewValuesOnly(combinedValue, processedValue || value[i]);
              }

              // only modify the value if it was touched
              // by any plugin to prevent unnecessary mutations
              if (combinedValue.length > 0) {
                style[property] = combinedValue;
              }
            } else {
              var _processedValue = prefixValue(plugins, property, value, style, this._metaData);

              // only modify the value if it was touched
              // by any plugin to prevent unnecessary mutations
              if (_processedValue) {
                style[property] = _processedValue;
              }

              // add prefixes to properties
              if (this._requiresPrefix[property]) {
                style[this._browserInfo.jsPrefix + capitalizeString(property)] = value;
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
          return fallback(styles);
        }
      }]);
      return Prefixer;
    }();
  }

  function prefixProperty(prefixProperties, property, style) {
    var requiredPrefixes = prefixProperties[property];

    if (requiredPrefixes) {
      for (var i = 0, len = requiredPrefixes.length; i < len; ++i) {
        style[requiredPrefixes[i] + capitalizeString(property)] = style[property];
      }
    }
  }

  function createPrefixer$1(propertyPrefixMap) {
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

  var prefixes = ['-webkit-', '-moz-', ''];

  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };

  function cursor(property, value) {
    if (property === 'cursor' && values[value]) {
      return prefixes.map(function (prefix) {
        return prefix + value;
      });
    }
  }

  var regex = /-webkit-|-moz-|-ms-/;
  function isPrefixedValue(value) {
    if (Array.isArray(value)) {
      value = value.join(',');
    }

    return value.match(regex) !== null;
  }

  // http://caniuse.com/#search=cross-fade
  var prefixes$1 = ['-webkit-', ''];

  function crossFade(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('cross-fade(') > -1) {
      return prefixes$1.map(function (prefix) {
        return value.replace(/cross-fade\(/g, prefix + 'cross-fade(');
      });
    }
  }

  // http://caniuse.com/#feat=css-filter-function
  var prefixes$2 = ['-webkit-', ''];

  function filter(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('filter(') > -1) {
      return prefixes$2.map(function (prefix) {
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
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple'
  };

  var alternativeProps = {
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
    if (alternativeProps[property]) {
      style[alternativeProps[property]] = alternativeValues[value] || value;
    }
  }

  var prefixes$3 = ['-webkit-', '-moz-', ''];
  var values$2 = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.match(values$2) !== null) {
      return prefixes$3.map(function (prefix) {
        return prefix + value;
      });
    }
  }

  // http://caniuse.com/#feat=css-image-set
  var prefixes$4 = ['-webkit-', ''];

  function imageSet(property, value) {
    if (typeof value === 'string' && !isPrefixedValue(value) && value.indexOf('image-set(') > -1) {
      return prefixes$4.map(function (prefix) {
        return value.replace(/image-set\(/g, prefix + 'image-set(');
      });
    }
  }

  function position(property, value) {
    if (property === 'position' && value === 'sticky') {
      return ['-webkit-sticky', 'sticky'];
    }
  }

  var prefixes$5 = ['-webkit-', '-moz-', ''];

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
      return prefixes$5.map(function (prefix) {
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

  var plugins$1 = [crossFade, cursor, filter, flexboxOld, gradient, imageSet, position, sizing, transition, flex];

  var fallback = createPrefixer$1(propertyPrefixMap, plugins$1);

  var propertyPrefixMap$1 = { "chrome": { "appearance": 59, "userSelect": 53, "textEmphasisPosition": 59, "textEmphasis": 59, "textEmphasisStyle": 59, "textEmphasisColor": 59, "boxDecorationBreak": 59, "clipPath": 54, "maskImage": 59, "maskMode": 59, "maskRepeat": 59, "maskPosition": 59, "maskClip": 59, "maskOrigin": 59, "maskSize": 59, "maskComposite": 59, "mask": 59, "maskBorderSource": 59, "maskBorderMode": 59, "maskBorderSlice": 59, "maskBorderWidth": 59, "maskBorderOutset": 59, "maskBorderRepeat": 59, "maskBorder": 59, "maskType": 59, "textDecorationStyle": 56, "textDecorationSkip": 56, "textDecorationLine": 56, "textDecorationColor": 56, "filter": 52, "fontFeatureSettings": 47, "breakAfter": 49, "breakBefore": 49, "breakInside": 49, "columnCount": 49, "columnFill": 49, "columnGap": 49, "columnRule": 49, "columnRuleColor": 49, "columnRuleStyle": 49, "columnRuleWidth": 49, "columns": 49, "columnSpan": 49, "columnWidth": 49 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "flexWrap": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transform": 8, "transformOrigin": 8, "transformOriginX": 8, "transformOriginY": 8, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transformStyle": 8, "transformOriginZ": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "animationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 10.1, "userSelect": 10.1, "backdropFilter": 10.1, "fontKerning": 9, "scrollSnapType": 10.1, "scrollSnapPointsX": 10.1, "scrollSnapPointsY": 10.1, "scrollSnapDestination": 10.1, "scrollSnapCoordinate": 10.1, "boxDecorationBreak": 10.1, "clipPath": 10.1, "maskImage": 10.1, "maskMode": 10.1, "maskRepeat": 10.1, "maskPosition": 10.1, "maskClip": 10.1, "maskOrigin": 10.1, "maskSize": 10.1, "maskComposite": 10.1, "mask": 10.1, "maskBorderSource": 10.1, "maskBorderMode": 10.1, "maskBorderSlice": 10.1, "maskBorderWidth": 10.1, "maskBorderOutset": 10.1, "maskBorderRepeat": 10.1, "maskBorder": 10.1, "maskType": 10.1, "textDecorationStyle": 10.1, "textDecorationSkip": 10.1, "textDecorationLine": 10.1, "textDecorationColor": 10.1, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10.1, "flowInto": 10.1, "flowFrom": 10.1, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 10.1, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "borderRadius": 3.6, "borderImage": 14, "borderImageOutset": 14, "borderImageRepeat": 14, "borderImageSlice": 14, "borderImageSource": 14, "borderImageWidth": 14, "flex": 21, "flexBasis": 21, "flexDirection": 21, "flexGrow": 21, "flexFlow": 21, "flexShrink": 21, "flexWrap": 21, "alignContent": 21, "alignItems": 21, "alignSelf": 21, "justifyContent": 21, "order": 21, "transition": 15, "transitionDelay": 15, "transitionDuration": 15, "transitionProperty": 15, "transitionTimingFunction": 15, "transform": 15, "transformOrigin": 15, "transformOriginX": 15, "transformOriginY": 15, "backfaceVisibility": 15, "perspective": 15, "perspectiveOrigin": 15, "transformStyle": 15, "transformOriginZ": 15, "animation": 15, "animationDelay": 15, "animationDirection": 15, "animationFillMode": 15, "animationDuration": 15, "animationIterationCount": 15, "animationName": 15, "animationPlayState": 15, "animationTimingFunction": 15, "appearance": 54, "userSelect": 54, "boxSizing": 28, "textAlignLast": 48, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 54, "resize": 4, "hyphens": 42, "backgroundClip": 3.6, "backgroundOrigin": 3.6, "backgroundSize": 3.6, "fontFeatureSettings": 33, "boxShadow": 3.6, "breakAfter": 51, "breakBefore": 51, "breakInside": 51, "columnCount": 51, "columnFill": 51, "columnGap": 51, "columnRule": 51, "columnRuleColor": 51, "columnRuleStyle": 51, "columnRuleWidth": 51, "columns": 51, "columnSpan": 51, "columnWidth": 51 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "flexWrap": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "transform": 22, "transformOrigin": 22, "transformOriginX": 22, "transformOriginY": 22, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transformStyle": 22, "transformOriginZ": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "animationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 44, "userSelect": 40, "fontKerning": 19, "textEmphasisPosition": 44, "textEmphasis": 44, "textEmphasisStyle": 44, "textEmphasisColor": 44, "boxDecorationBreak": 44, "clipPath": 41, "maskImage": 44, "maskMode": 44, "maskRepeat": 44, "maskPosition": 44, "maskClip": 44, "maskOrigin": 44, "maskSize": 44, "maskComposite": 44, "mask": 44, "maskBorderSource": 44, "maskBorderMode": 44, "maskBorderSlice": 44, "maskBorderWidth": 44, "maskBorderOutset": 44, "maskBorderRepeat": 44, "maskBorder": 44, "maskType": 44, "textDecorationStyle": 43, "textDecorationSkip": 43, "textDecorationLine": 43, "textDecorationColor": 43, "filter": 39, "fontFeatureSettings": 34, "breakAfter": 36, "breakBefore": 36, "breakInside": 36, "columnCount": 36, "columnFill": 36, "columnGap": 36, "columnRule": 36, "columnRuleColor": 36, "columnRuleStyle": 36, "columnRuleWidth": 36, "columns": 36, "columnSpan": 36, "columnWidth": 36 }, "ie": { "userSelect": 11, "wrapFlow": 11, "wrapThrough": 11, "wrapMargin": 11, "scrollSnapType": 11, "scrollSnapPointsX": 11, "scrollSnapPointsY": 11, "scrollSnapDestination": 11, "scrollSnapCoordinate": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "gridTemplateColumns": 11, "gridTemplateRows": 11, "gridTemplateAreas": 11, "gridTemplate": 11, "gridAutoColumns": 11, "gridAutoRows": 11, "gridAutoFlow": 11, "grid": 11, "gridRowStart": 11, "gridColumnStart": 11, "gridRowEnd": 11, "gridRow": 11, "gridColumn": 11, "gridColumnEnd": 11, "gridColumnGap": 11, "gridRowGap": 11, "gridArea": 11, "gridGap": 11, "textSizeAdjust": 11 }, "edge": { "userSelect": 15, "wrapFlow": 15, "wrapThrough": 15, "wrapMargin": 15, "scrollSnapType": 15, "scrollSnapPointsX": 15, "scrollSnapPointsY": 15, "scrollSnapDestination": 15, "scrollSnapCoordinate": 15, "hyphens": 15, "flowInto": 15, "flowFrom": 15, "breakBefore": 15, "breakAfter": 15, "breakInside": 15, "regionFragment": 15, "gridTemplateColumns": 15, "gridTemplateRows": 15, "gridTemplateAreas": 15, "gridTemplate": 15, "gridAutoColumns": 15, "gridAutoRows": 15, "gridAutoFlow": 15, "grid": 15, "gridRowStart": 15, "gridColumnStart": 15, "gridRowEnd": 15, "gridRow": 15, "gridColumn": 15, "gridColumnEnd": 15, "gridColumnGap": 15, "gridRowGap": 15, "gridArea": 15, "gridGap": 15 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "flexWrap": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transformStyle": 8.1, "transformOriginZ": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "animationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 10, "userSelect": 10, "backdropFilter": 10, "fontKerning": 10, "scrollSnapType": 10, "scrollSnapPointsX": 10, "scrollSnapPointsY": 10, "scrollSnapDestination": 10, "scrollSnapCoordinate": 10, "boxDecorationBreak": 10, "clipPath": 10, "maskImage": 10, "maskMode": 10, "maskRepeat": 10, "maskPosition": 10, "maskClip": 10, "maskOrigin": 10, "maskSize": 10, "maskComposite": 10, "mask": 10, "maskBorderSource": 10, "maskBorderMode": 10, "maskBorderSlice": 10, "maskBorderWidth": 10, "maskBorderOutset": 10, "maskBorderRepeat": 10, "maskBorder": 10, "maskType": 10, "textSizeAdjust": 10, "textDecorationStyle": 10, "textDecorationSkip": 10, "textDecorationLine": 10, "textDecorationColor": 10, "shapeImageThreshold": 10, "shapeImageMargin": 10, "shapeImageOutside": 10, "filter": 9, "hyphens": 10, "flowInto": 10, "flowFrom": 10, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 10, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "flexWrap": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "transform": 4.4, "transformOrigin": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transformStyle": 4.4, "transformOriginZ": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "animationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 53, "userSelect": 53, "fontKerning": 4.4, "textEmphasisPosition": 53, "textEmphasis": 53, "textEmphasisStyle": 53, "textEmphasisColor": 53, "boxDecorationBreak": 53, "clipPath": 53, "maskImage": 53, "maskMode": 53, "maskRepeat": 53, "maskPosition": 53, "maskClip": 53, "maskOrigin": 53, "maskSize": 53, "maskComposite": 53, "mask": 53, "maskBorderSource": 53, "maskBorderMode": 53, "maskBorderSlice": 53, "maskBorderWidth": 53, "maskBorderOutset": 53, "maskBorderRepeat": 53, "maskBorder": 53, "maskType": 53, "filter": 4.4, "fontFeatureSettings": 4.4, "breakAfter": 53, "breakBefore": 53, "breakInside": 53, "columnCount": 53, "columnFill": 53, "columnGap": 53, "columnRule": 53, "columnRuleColor": 53, "columnRuleStyle": 53, "columnRuleWidth": 53, "columns": 53, "columnSpan": 53, "columnWidth": 53 }, "and_chr": { "appearance": 55, "textEmphasisPosition": 55, "textEmphasis": 55, "textEmphasisStyle": 55, "textEmphasisColor": 55, "boxDecorationBreak": 55, "maskImage": 55, "maskMode": 55, "maskRepeat": 55, "maskPosition": 55, "maskClip": 55, "maskOrigin": 55, "maskSize": 55, "maskComposite": 55, "mask": 55, "maskBorderSource": 55, "maskBorderMode": 55, "maskBorderSlice": 55, "maskBorderWidth": 55, "maskBorderOutset": 55, "maskBorderRepeat": 55, "maskBorder": 55, "maskType": 55, "textDecorationStyle": 55, "textDecorationSkip": 55, "textDecorationLine": 55, "textDecorationColor": 55 }, "and_uc": { "flex": 11, "flexBasis": 11, "flexDirection": 11, "flexGrow": 11, "flexFlow": 11, "flexShrink": 11, "flexWrap": 11, "alignContent": 11, "alignItems": 11, "alignSelf": 11, "justifyContent": 11, "order": 11, "transition": 11, "transitionDelay": 11, "transitionDuration": 11, "transitionProperty": 11, "transitionTimingFunction": 11, "transform": 11, "transformOrigin": 11, "transformOriginX": 11, "transformOriginY": 11, "backfaceVisibility": 11, "perspective": 11, "perspectiveOrigin": 11, "transformStyle": 11, "transformOriginZ": 11, "animation": 11, "animationDelay": 11, "animationDirection": 11, "animationFillMode": 11, "animationDuration": 11, "animationIterationCount": 11, "animationName": 11, "animationPlayState": 11, "animationTimingFunction": 11, "appearance": 11, "userSelect": 11, "fontKerning": 11, "textEmphasisPosition": 11, "textEmphasis": 11, "textEmphasisStyle": 11, "textEmphasisColor": 11, "maskImage": 11, "maskMode": 11, "maskRepeat": 11, "maskPosition": 11, "maskClip": 11, "maskOrigin": 11, "maskSize": 11, "maskComposite": 11, "mask": 11, "maskBorderSource": 11, "maskBorderMode": 11, "maskBorderSlice": 11, "maskBorderWidth": 11, "maskBorderOutset": 11, "maskBorderRepeat": 11, "maskBorder": 11, "maskType": 11, "textSizeAdjust": 11, "filter": 11, "hyphens": 11, "flowInto": 11, "flowFrom": 11, "breakBefore": 11, "breakAfter": 11, "breakInside": 11, "regionFragment": 11, "fontFeatureSettings": 11, "columnCount": 11, "columnFill": 11, "columnGap": 11, "columnRule": 11, "columnRuleColor": 11, "columnRuleStyle": 11, "columnRuleWidth": 11, "columns": 11, "columnSpan": 11, "columnWidth": 11 }, "op_mini": {} };

  function getPrefixedValue(prefixedValue, value, keepUnprefixed) {
    if (keepUnprefixed) {
      return [prefixedValue, value];
    }
    return prefixedValue;
  }

  var grabValues = {
    grab: true,
    grabbing: true
  };

  var zoomValues = {
    'zoom-in': true,
    'zoom-out': true
  };

  function cursor$1(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    // adds prefixes for firefox, chrome, safari, and opera regardless of
    // version until a reliable browser support info can be found
    // see: https://github.com/rofrischmann/inline-style-prefixer/issues/79
    if (property === 'cursor' && grabValues[value] && (browserName === 'firefox' || browserName === 'chrome' || browserName === 'safari' || browserName === 'opera')) {
      return getPrefixedValue(cssPrefix + value, value, keepUnprefixed);
    }

    if (property === 'cursor' && zoomValues[value] && (browserName === 'firefox' && browserVersion < 24 || browserName === 'chrome' && browserVersion < 37 || browserName === 'safari' && browserVersion < 9 || browserName === 'opera' && browserVersion < 24)) {
      return getPrefixedValue(cssPrefix + value, value, keepUnprefixed);
    }
  }

  function crossFade$1(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && value.indexOf('cross-fade(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || (browserName === 'ios_saf' || browserName === 'safari') && browserVersion < 10)) {
      return getPrefixedValue(value.replace(/cross-fade\(/g, cssPrefix + 'cross-fade('), value, keepUnprefixed);
    }
  }

  function filter$1(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && value.indexOf('filter(') > -1 && (browserName === 'ios_saf' || browserName === 'safari' && browserVersion < 9.1)) {
      return getPrefixedValue(value.replace(/filter\(/g, cssPrefix + 'filter('), value, keepUnprefixed);
    }
  }

  var values$4 = {
    flex: true,
    'inline-flex': true
  };

  function flex$1(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (property === 'display' && values$4[value] && (browserName === 'chrome' && browserVersion < 29 && browserVersion > 20 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 9 && browserVersion > 6 || browserName === 'opera' && (browserVersion === 15 || browserVersion === 16))) {
      return getPrefixedValue(cssPrefix + value, value, keepUnprefixed);
    }
  }

  var alternativeValues$1 = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple',
    flex: 'box',
    'inline-flex': 'inline-box'
  };

  var alternativeProps$1 = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };

  var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
  var properties$2 = Object.keys(alternativeProps$1).concat(otherProps);

  function flexboxOld$1(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed,
        requiresPrefix = _ref.requiresPrefix;

    if ((properties$2.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browserName === 'firefox' && browserVersion < 22 || browserName === 'chrome' && browserVersion < 21 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion <= 6.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
      delete requiresPrefix[property];

      if (!keepUnprefixed && !Array.isArray(style[property])) {
        delete style[property];
      }
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
      if (property === 'display' && alternativeValues$1[value]) {
        return getPrefixedValue(cssPrefix + alternativeValues$1[value], value, keepUnprefixed);
      }
      if (alternativeProps$1[property]) {
        style[alternativeProps$1[property]] = alternativeValues$1[value] || value;
      }
    }
  }

  var values$5 = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;

  function gradient$1(property, value, style, _ref) {
    var browserName = _ref.browserName,
        browserVersion = _ref.browserVersion,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && value.match(values$5) !== null && (browserName === 'firefox' && browserVersion < 16 || browserName === 'chrome' && browserVersion < 26 || (browserName === 'safari' || browserName === 'ios_saf') && browserVersion < 7 || (browserName === 'opera' || browserName === 'op_mini') && browserVersion < 12.1 || browserName === 'android' && browserVersion < 4.4 || browserName === 'and_uc')) {
      return getPrefixedValue(cssPrefix + value, value, keepUnprefixed);
    }
  }

  function imageSet$1(property, value, style, _ref) {
    var browserName = _ref.browserName,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (typeof value === 'string' && value.indexOf('image-set(') > -1 && (browserName === 'chrome' || browserName === 'opera' || browserName === 'and_chr' || browserName === 'and_uc' || browserName === 'ios_saf' || browserName === 'safari')) {
      return getPrefixedValue(value.replace(/image-set\(/g, cssPrefix + 'image-set('), value, keepUnprefixed);
    }
  }

  function position$1(property, value, _ref) {
    var browserName = _ref.browserName,
        cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    if (property === 'position' && value === 'sticky' && (browserName === 'safari' || browserName === 'ios_saf')) {
      return getPrefixedValue(cssPrefix + value, value, keepUnprefixed);
    }
  }

  var properties$3 = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values$6 = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };

  // TODO: chrome & opera support it
  function sizing$1(property, value, style, _ref) {
    var cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed;

    // This might change in the future
    // Keep an eye on it
    if (properties$3[property] && values$6[value]) {
      return getPrefixedValue(cssPrefix + value, value, keepUnprefixed);
    }
  }

  var properties$4 = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true,
    MozTransition: true,
    MozTransitionProperty: true
  };

  var requiresPrefixDashCased = void 0;

  function transition$1(property, value, style, _ref) {
    var cssPrefix = _ref.cssPrefix,
        keepUnprefixed = _ref.keepUnprefixed,
        requiresPrefix = _ref.requiresPrefix;

    if (typeof value === 'string' && properties$4[property]) {
      var _ret = function () {
        // memoize the prefix array for later use
        if (!requiresPrefixDashCased) {
          requiresPrefixDashCased = Object.keys(requiresPrefix).map(function (prop) {
            return hyphenateStyleName(prop);
          });
        }

        // only split multi values, not cubic beziers
        var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);

        requiresPrefixDashCased.forEach(function (prop) {
          multipleValues.forEach(function (val, index) {
            if (val.indexOf(prop) > -1 && prop !== 'order') {
              multipleValues[index] = val.replace(prop, cssPrefix + prop) + (keepUnprefixed ? ',' + val : '');
            }
          });
        });

        return {
          v: multipleValues.join(',')
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
    }
  }

  var plugins = [crossFade$1, cursor$1, filter$1, flexboxOld$1, gradient$1, imageSet$1, position$1, sizing$1, transition$1, flex$1];

  var index = createPrefixer(propertyPrefixMap$1, plugins, fallback);

  return index;

}));
//# sourceMappingURL=inline-style-prefixer.js.map