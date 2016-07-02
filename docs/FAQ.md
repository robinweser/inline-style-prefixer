# FAQ

1. [How can I do server-side rendering?](#1-server-side-rendering)
2. [Why is my userAgent not supported?](#2-unsupported-useragent)
3. [Why do some Cordova apps & in-app browser have issues?](#3-cordova-apps--in-app-browser)
4. [Can I only use the static version to reduce file size?](#4-static-version)

## 1. Server-side rendering
Doing server-side rendering there also is no `window.navigator` which can be used by default. You need to pass a valid `userAgent` (preferable taken from the `request headers` itself) to the prefixer instance.<br>
Another solution would be to use the `inline-style-prefixer/static` version.

## 2. Unsupported userAgent
If you still get the warning even if using a valid `userAgent` the issue's most likely caused by [bowser](https://github.com/ded/bowser) which is the browser detection library this prefixer is built on. In most cases bowser fails to detect the correct browser information. To check if that's the case simply use this snippet:
```javascript
console.log(new Prefixer()._browserInfo)
```

## 3. Cordova apps & in-app browser
We have seen different issues with [Cordova](https://cordova.apache.org)-based mobile applications as well as several in-app browsers. This is due to their userAgent which differs from default ones.<br>
This especially occured on iOS 8.4.x.

<br> For **Cordova/Phonegap** there is a method of changing the userAgent. I'd suggest one that gets recognized by bowser.
```xml
	<preference name="OverrideUserAgent" value="/* userAgent */" />
```
For both I also recommend enabling the `keepUnprefixed` option.
> I hope that we will be able to support those out of the box as soon as possible.

## 4. Static version
The prefixer has a total of 9.5kb file size gzipped which is quite big compared to its benefit. If you're only using the static version anyways, you can directly import only the static subset to reduce file size drastically down to 2.5kb.<br>
Check the [API Reference](API.md#pro-tip) to learn how to do it.
