# FAQ

1. [How can I disable the warnings?](#1-disable-warnings) (for tests)
2. [How can I do server-side rendering?](#2-server-side-rendering)
3. [Why is my userAgent not supported?](#3-unsupported-useragent)
4. [Why do some Cordova apps & in-app browser have issues?](#4-cordova-apps--in-app-browser)

## 1. Disable warnings
If you're running tests and wan't to get rid of the warnings you might need set a `global.navigator` and pass a **valid** userAgent which gets validated correctly e.g.
```javascript
// Chrome 49 userAgent
global.navigator = {userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'}
```
([Radium's FAQ reference](https://github.com/FormidableLabs/radium/tree/master/docs/faq#how-can-i-get-rid-of-useragent-warnings-in-tests))
## 2. Server-side rendering
Doing server-side rendering there also is no `window.navigator` which can be used by default. You need to pass a valid `userAgent` (preferable taken from the `request headers` itself) to the prefixer instance.

## 3. Unsupported userAgent
If you still get the warning even if using a valid `userAgent` the issue's most likely caused by [bowser](https://github.com/ded/bowser) which is the browser detection library this prefixer is built on. In most cases bowser fails to detect the correct browser information. To check if that's the case simply use this snippet:
```javascript
console.log(new Prefixer()._browserInfo)
```

## 4. Cordova apps & in-app browser
We have seen different issues with [Cordova](https://cordova.apache.org)-based mobile applications as well as several in-app browsers. This is due to their userAgent which differs from default ones.<br>
This especially occured on iOS 8.4.x.

<br> For **Cordova/Phonegap** there is a method of changing the userAgent. I'd suggest one that gets recognized by bowser.
```xml
	<preference name="OverrideUserAgent" value="/* userAgent */" />
```
For both I also recommend enabling the `keepUnprefixed` option.
> I hope that we will be able to support those out of the box as soon as possible.
