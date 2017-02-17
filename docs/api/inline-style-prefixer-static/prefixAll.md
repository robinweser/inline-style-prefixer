
# `prefixAll(style)`

Adds all available vendor prefixes to the `style` object.

#### Arguments
1. `style` (*Object*): An object containing valid style declarations.

#### Returns
(*Object*): An object containing all style declarations with vendor prefixes.

#### Example
```javascript
import prefixAll from 'inline-style-prefixer/static'

const style = { alignItems: 'center' }

const prefixedStyle = prefixAll(style)

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
