# API Reference

* [`Prefixer([config])`](#prefixerconfig)
  * [`prefix(styles)`](#prefixstyles)
  * [`prefixAll(styles)`](#prefixallstyles)
  * [Properties](#properties)

## `Prefixer([config])`

Creates a new dynamic prefixer instance.

#### Arguments
1. `config` (*Object?*): Prefixer configuration. See [Config](#config) for possible options.

#### Returns
(*Prefixer*): Prefixer instance.


#### Example
```javascript
import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer()
```

##### Configuration
##### `userAgent`
*Default: `navigator.userAgent`*

Sometimes your environment does not provide a proper userAgent string e.g. if you are **rendering on server-side**. Therefore optionally just pass a userAgent-string.

```javascript
const customUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36'

const prefixer = new Prefixer({ userAgent: customUserAgent })
```

##### `keepUnprefixed`
*Default: `false`*

Use this option to keep default values. This should be used if you're facing wrong prefixes.

##### Example
```javascript
import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer({ keepUnprefixed: true })
```

---------

### `prefix(styles)`
Adds all required vendor prefixes to a style object.

#### Arguments
1. `styles` (*Object*): An object containing valid style declarations.

#### Returns
(*Object*): An object containing all style declarations with modified vendor prefixes.

#### Example
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

##### `keepUnprefixed`
```javascript
import Prefixer from 'inline-style-prefixer'

const styles = {
  userSelect: 'none',
  display: 'flex'
}

const prefixer = new Prefixer({ keepUnprefixed: true })
const prefixedStyles = prefixer.prefix(styles)

// Assuming you are using e.g. Chrome version 22
// prefixedStyles === output
const output = {
  WebkitUserSelect: 'none',  
  // unprefixed properties do not get removed
  userSelect: 'none',
  // unprefixed values will be appended to the string
  display: ['-webkit-flex', 'flex']
}
```

---------

### `prefixAll(styles)`

A static `Prefixer` method that adds all available vendor prefix variations for any browser.

#### Arguments
1. `styles` (*Object*): An object containing valid style declarations.

#### Returns
(*Object*): An object containing all style declarations with modified vendor prefixes.

#### Example
```javascript
import Prefixer from 'inline-style-prefixer'

const styles = {alignItems: 'center'}

const prefixedStyles = Prefixer.prefixAll(styles)

// the userAgent doesn't matter
// prefixedStyles === output
const output = {
  WebkitAlignItems: 'space-around',
  msAlignItems: 'space-around',
  alignItems: 'space-around',
  // it also adds legacy properties and values
  // by running every plugin available
  WebkitBoxAlign: 'justify',
  msFlexAlign: 'distribute',
}
```

#### Pro Tip
If you only want to use the static prefixing, you can directly import it from  `inline-style-prefixer/static` to reduce file size. It only has 2.5kb gzipped instead of 9.5kb.

```javascript
import prefixAll from 'inline-style-prefixer/static'

const styles = { alignItems: 'center' }

const prefixedStyles = prefixAll(styles)

// the userAgent doesn't matter
// prefixedStyles === output
const output = {
  WebkitAlignItems: 'space-around',
  msAlignItems: 'space-around',
  alignItems: 'space-around',
  // it also adds legacy properties and values
  // by running every plugin available
  WebkitBoxAlign: 'justify',
  msFlexAlign: 'distribute',
}
```

## Properties
Every `Prefixer` instance also provides prefix information.

```javascript
// e.g. using a Chrome version 40 userAgent
prefixer.cssPrefix = '-webkit-'
prefixer.jsPrefix = 'Webkit'
prefixer.prefixedKeyframes = '-webkit-keyframes'
```
