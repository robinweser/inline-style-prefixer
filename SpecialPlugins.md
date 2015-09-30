# Special Plugins
Sometimes it is not enough to just prefix a property, but you also need to prefix the value or even transform the value at all.<br>
Therefore special plugins are used to tackle browser incompatibilities.<br>
Right now there are 7 plugins. More might come if suggested.
<br>


* `calc`: Adds support for prefixed `calc` values on any property.

* `cursor`: Adds support for prefixed new `cursor` values `zoom-in`, `zoom-out`, `grab`, `grabbing`.

* `flex`: Adds support for prefixed `display` values using `display: flex` or `display: inline-flex`. 

* `flexboxIE`: Adds trasformators for the early 2012 flexbox specification used in IE 10 and IE Mobile 10.

* `flexboxOld`: Adds trasformators for the old 2009 flexbox specification used in old Webkit-based browsers.

* `gradient`: Adds support for prefixed `background` and `backgroundImage` values `linear-gradient`, `radial-gradient`, `repeating-linear-gradient` and `repeating-radial-gradient`. 

* `sizing`: Adds support for prefixed `maxHeight`, `maxWidth`, `width`, `height`, `columnWidth`,`minWidth`, `minHeight` intrinsic & extrinsic sizing values `min-content`, `max-content`, `fill-available`, `fit-content`, `contain-floats`