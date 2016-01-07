<h1 align="center"><img src="docs/res/logo.png" width=600></div>
</h1>
[![Build Status](https://travis-ci.org/rofrischmann/inline-style-prefixer.svg)](https://travis-ci.org/rofrischmann/inline-style-prefixer)
[![Code Climate](https://codeclimate.com/github/rofrischmann/inline-style-prefixer/badges/gpa.svg)](https://codeclimate.com/github/rofrischmann/inline-style-prefixer)
[![npm version](https://badge.fury.io/js/inline-style-prefixer.svg)](http://badge.fury.io/js/inline-style-prefixer)
[![npm downloads](https://img.shields.io/npm/dm/inline-style-prefixer.svg)](https://img.shields.io/npm/dm/inline-style-prefixer.svg)
![Dependencies](https://david-dm.org/rofrischmann/inline-style-prefixer.svg)
![Gzipped Size](https://img.shields.io/badge/gzipped-~8k-blue.svg)

**inline-style-prefixer** adds required **vendor prefixes** to your style object. It only adds prefixes if they're actually required by evaluating the browser's `userAgent` against data from [caniuse.com](http://caniuse.com/).

## Browser Support
Supports the major browsers with the following versions. <br>For legacy support check [custom build](custom-build--legacy-support).
* Chrome: 30+
* Safari: 6+
* Firefox: 25+
* Opera: 13+
* IE: 9+
* Edge 12+
* iOS: 6+
* Android: 4+
* IE mobile: 9+
* Opera mini: 5+
* Android UC: 9+

#### Whitelisted Browser
Some browser e.g. headless browsers are whitelisted to not throw errors and not prefix at all.
* PhantomJS

## Usage
```bash
npm install inline-style-prefixer
```
## Prefixer(options)
| Option | Default | Description |
| ------ | ------ | ------ |
| [userAgent](#useragent)<br>*(optional)* | `navigator.userAgent`  | userAgent used to detect browser features |
| [keepUnprefixed](#keepunprefixed)<br>*(optional)* | `false`  | keeps unprefixed properties and values |
```javascript
import Prefixer from 'inline-style-prefixer'

const styles = {
  transition: '200ms all linear',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  color: 'blue'
}

const prefixer = new Prefixer()
const prefixedStyles = prefixer.prefix(styles)

// Assuming you are using e.g. Chrome version 25
// prefixedStyles === output
const output = {
  transition: '200ms all linear',
  WebkitUserSelect: 'none',
  boxSizing: 'border-box',
  display: '-webkit-flex',
  color: 'blue'
}
```
### keepUnprefixed
Use this option to keep default values. This should be used if you're facing wrong prefixes.
```javascript
const styles = {
  userSelect: 'none',
  display: 'flex'
}

const prefixer = new Prefixer({keepUnprefixed: true})
const prefixedStyles = prefixer.prefix(styles)

// Assuming you are using e.g. Chrome version 22
// prefixedStyles === output
const output = {
  WebkitUserSelect: 'none',  
  // unprefixed properties do not get removed
  userSelect: 'none',
  // unprefixed values will be appended to the string
  display: '-webkit-flex:display:flex'
}
```

### userAgent
Sometimes your environment does not provide a proper userAgent string e.g. if you are **rendering on server-side**. Therefore optionally just pass a userAgent-string.

```javascript
const customUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36'

const prefixer = new Prefixer({userAgent: customUserAgent})
```

## prefixAll (static)
Sometimes you might to prerender something without knowing the userAgent yet. Use the static `prefixAll` to achieve that.

```javascript
const styles = {alignItems: 'center'}

const prefixedStyles = Prefixer.prefixAll(styles)

// the userAgent doesn't matter
// prefixedStyles === output
const output = {
  MozAlignItems: 'center',
  WebkitAlignItems: 'center',
  msAlignItems: 'center',
  alignItems: 'center',
  // it also adds legacy properties
  // by running every plugin available
  WebkitBoxAlign: 'center',
  msFlexAlign: 'center',
}
```

## Prefix information
Every `Prefixer` instance also provides prefix information.
```javascript
// e.g. using a Chrome version 40 userAgent
prefixer.cssPrefix = '-webkit-'
prefixer.jsPrefix = 'Webkit'
prefixer.prefixedKeyframes = '-webkit-keyframes'
```

## Custom Build & Legacy Support
You may have to create a custom build if you need older browser versions. Just modify the [config.js](config.js) file which includes all the browser version specifications.
```sh
npm install
npm run build
```

## Supported properties
The following list shows all supported properties that get evaluated.<br>
They are grouped in caniuse groups.

* animation, animationDelay, animationDirection, animationFillMode, animationDuration, animationIterationCount, animationName, animationPlayState, animationTimingFunction
* appearance
* backdropFilter
* backfaceVisibility, perspective, perspectiveOrigin, transform, transformOrigin, transformStyle, transformOriginX, transformOriginY, transformOriginZ
* backgroundClip, backgroundOrigin, backgroundSize
* borderImage, borderImageOutset, borderImageRepeat, borderImageSlice, borderImageSource, borderImageWidth
* borderRadius
* boxDecorationBreak
* boxShadow
* boxSizing
* breakAfter, breakBefore, breakInside, columnCount, columnFill, columnGap, columnRule, columnRuleColor, columnRuleStyle, columnRuleWidth, columns, columnSpan, columnWidth
* clipPath
* filter
* flex, flexBasis, flexDirection, flexGrow, flexFlow, flexShrink, flexWrap, alignContent, alignItems, alignSelf, justifyContent, order
* flowInto, flowFrom, breakBefore, breakAfter, breakInside, regionFragment
* fontFeatureSettings
* fontKerning
* gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridTemplate, gridAutoColumns, gridAutoRows, gridAutoFlow, grid, gridRowStart, gridColumnStart, gridRowEnd, gridRow, gridColumn, gridArea, rowGap, columnGap, gridGap
* hyphens
* maskImage, maskMode, maskRepeat, maskPosition, maskClip, maskOrigin, maskSize, maskComposite, mask, maskBorderSource, maskBorderMode, maskBorderSlice, maskBorderWidth, maskBorderOutset, maskBorderRepeat, maskBorder, maskType
* objectFit, objectPosition
* resize
* scrollSnapType, scrollSnapPointsX, scrollSnapPointsY, scrollSnapDestination, scrollSnapCoordinate
* shapeImageThreshold, shapeImageMargin, shapeImageOutside
* tabSize
* textAlignLast
* textDecorationStyle, textDecorationSkip, textDecorationLine, textDecorationColor
* textEmphasisPosition, textEmphasis, textEmphasisStyle, textEmphasisColor
* textOverflow
* textSizeAdjust
* touchAction
* transition, transitionDelay, transitionDuration, transitionProperty, transitionTimingFunction
* userSelect
* wrapFlow, wrapThrough, wrapMargin

## Special plugins
Sometimes it is not enough to just prefix a property, but you also need to prefix the value or even transform the property and value completely. Plugins are used to tackle browser incompatibilities. File an issue or submit a PR if a plugin you need is missing (these are roughly equivalent to Autoprefixer's *hacks*). The following plugins are included by default:

* **calc**: Adds support for prefixed `calc` values on any property.
* **cursor**: Adds support for prefixed new `cursor` values `zoom-in`, `zoom-out`, `grab`, `grabbing`.
* **flex**: Adds support for prefixed `display` values using `display: flex` or `display: inline-flex`.
* **flexboxIE**: Adds trasformators for the early 2012 flexbox specification used in IE 10 and IE Mobile 10.
* **flexboxOld**: Adds trasformators for the old 2009 flexbox specification used in old Webkit-based browsers.
* **gradient**: Adds support for prefixed `background` and `backgroundImage` values `linear-gradient`, `radial-gradient`, `repeating-linear-gradient` and `repeating-radial-gradient`.
* **sizing**: Adds support for prefixed `maxHeight`, `maxWidth`, `width`, `height`, `columnWidth`,`minWidth`, `minHeight` intrinsic & extrinsic sizing values `min-content`, `max-content`, `fill-available`, `fit-content`, `contain-floats`

## Known issues
Most issues so far have been due to false browser detection which is by now handled by [bowser](https://github.com/ded/bowser). If your browser (userAgent) does not get evaluated correctly, please create an issue at the bowser repository, not here.<br>
To check if your browser gets evaluated correctly, simply add this to your code:
```javascript
console.log(new Prefixer()._browserInfo)
```

# License
**inline-style-prefixer** is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de).

# Contributing
I would love to see people getting involved.<br>
If you have a feature request please create an issue. Also if you're even improving inline-style-prefixer by any kind please don't be shy and send a pull request to let everyone benefit.

### Issues
If you're having any issue please let me know as fast as possible to find a solution a hopefully fix the issue. Try to add as much information as possible such as your environment, exact case, the line of actions to reproduce the issue.

### Pull Requests
If you are creating a pull request, try to use commit messages that are self-explanatory. Also always add some **tests** unless it's totally senseless (add a reason why it's senseless) and test your code before you commit so Travis won't throw errors.
