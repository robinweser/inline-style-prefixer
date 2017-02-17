# FAQ

1. [Why is my userAgent not supported?](#2-unsupported-useragent)
2. [Why do some Cordova apps & in-app browser have issues?](#3-cordova-apps--in-app-browser)

## 1. Unsupported userAgent
If you still get the warning even if using a valid `userAgent` the issue's most likely caused by [bowser](https://github.com/ded/bowser) which is the browser detection library this prefixer is built on. In most cases bowser fails to detect the correct browser information. To check if that's the case simply use this snippet:
```javascript
console.log(new Prefixer()._browserInfo)
```

## 2. Cordova apps & in-app browser
We have seen different issues with [Cordova](https://cordova.apache.org)-based mobile applications as well as several in-app browsers. This is due to their userAgent which differs from default ones.<br>
This especially occured on iOS 8.4.x.

<br> For **Cordova/Phonegap** there is a method of changing the userAgent. I'd suggest one that gets recognized by bowser.
```xml
	<preference name="OverrideUserAgent" value="/* userAgent */" />
```
For both I also recommend enabling the `keepUnprefixed` option.
> I hope that we will be able to support those out of the box as soon as possible.
