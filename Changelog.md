# Changelog

## 0.6
### 0.6.3 (09.01.16)
* added support for Cordova apps & in-app browser *(especially on iOS 8.4.x)*
* fixed Android Chrome detection *(on Android 4.x)*
* added some [FAQ](docs/FAQ.md)'s

### 0.6.2 (03.01.16)
* fixed dist files to register globally

### 0.6.1 (03.01.16)
* replaced multi-options with an object hash
* renamed `keepDefaults` to `keepUnprefixed`

### 0.6.0 (03.01.16)
* fixed a bug that caused the `display:flex` plugin to prefix incorrectly
* added `forceRun`-option to plugins to support plugins when using `prefixAll`
* added `keepDefault`-option to keep defaults after prefixing
* added MS Edge support
* added whitelist for headless browsers
* several data updates

## 0.5
## 0.5.4 (03.12.15)
* fixed a typo in `animationIterationCount`

## 0.5.3 (28.11.15)
* Added 2D Transform to the searchMap so IE 9 prefixes `transform`, `transformOrigin`, `transformOriginX` and `transformOriginY`
* Removed unsupported browsers from browser detection to avoid false prefixes

## 0.5.2 (24.11.15)
* Added Changelog
* Android detection for older Versions (< 5)
* added `flexWrap` to the properties list
