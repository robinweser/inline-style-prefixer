# Special Plugins
Sometimes it is not enough to just prefix a property, but you also need to prefix the value or even transform the property and value completely. Plugins are used to tackle browser incompatibilities. File an issue or submit a PR if a plugin you need is missing (these are roughly equivalent to Autoprefixer's *hacks*). The following plugins are included by default:

### calc
Adds support for prefixed `calc` values on any property.
### cursor
Adds support for prefixed new `cursor` values `zoom-in`, `zoom-out`, `grab`, `grabbing`.

### flex
Adds support for prefixed `display` values using `display: flex` or `display: inline-flex`.

### flexboxIE
Adds trasformators for the early 2012 flexbox specification used in IE 10 and IE Mobile 10.

### flexboxOld
Adds trasformators for the old 2009 flexbox specification used in old Webkit-based browsers.

### gradient
Adds support for prefixed `background` and `backgroundImage` values `linear-gradient`, `radial-gradient`, `repeating-linear-gradient` and `repeating-radial-gradient`.

### sizing
Adds support for prefixed `maxHeight`, `maxWidth`, `width`, `height`, `columnWidth`,`minWidth`, `minHeight` intrinsic & extrinsic sizing values `min-content`, `max-content`, `fill-available`, `fit-content`, `contain-floats`
