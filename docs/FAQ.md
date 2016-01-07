# FAQ

1. [How can I disable the warnings?](#disablewarnings) (for tests)
2. [How can I do server-side rendering?](#server-siderendering)
3. [Why is my userAgent not supported?](#unsupporteduseragent)

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
