# Prefixer

## Constructor
Creates a new dynamic prefixer instance.

#### Arguments
1. `config` (*Object?*): Prefixer configuration. See [Configuration](#configuration) for possible options.

#### Returns
(*Prefixer*): Prefixer instance.


#### Example
```javascript
import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer()
```

#### Configuration
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| userAgent | *(string)* | `navigator.userAgent` | The userAgent that is used to detect required prefixes |
| keepUnprefixed | *(boolean)* | `false` | Keep default (unprefixed) properties and values | 

```javascript
const customUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36'

const prefixer = new Prefixer({
  userAgent: customUserAgent,
  keepUnprefixed: true
})
```
---------

### `prefix(style)`
Adds all required vendor prefixes to a style object.

#### Arguments
1. `style` (*Object*): An object containing valid style declarations.

#### Returns
(*Object*): An object containing all style declarations with modified vendor prefixes.

#### Example
```javascript
import Prefixer from 'inline-style-prefixer'

const style = {
  transition: '200ms all linear',
  userSelect: 'none',
  boxSizing: 'border-box',
  display: 'flex',
  color: 'blue'
}

const prefixer = new Prefixer()
const prefixedStyle = prefixer.prefix(style)

// Assuming you are using e.g. Chrome version 25
// prefixedStyle === output
const output = {
  transition: '200ms all linear',
  WebkitUserSelect: 'none',
  boxSizing: 'border-box',
  display: '-webkit-flex',
  color: 'blue'
}
```

##### Example using `keepUnprefixed`
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
  // unprefixed values will be kept in arrays
  display: [ '-webkit-flex', 'flex' ]
}
```

------

## Properties
Every `Prefixer` instance also provides prefix information.

```javascript
// e.g. using a Chrome version 40 userAgent
prefixer.cssPrefix = '-webkit-'
prefixer.jsPrefix = 'Webkit'
prefixer.prefixedKeyframes = '-webkit-keyframes'
```
