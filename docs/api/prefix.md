# prefix

Adds all available vendor prefixes to the `style` object.

## Arguments
| Argument | Type | Description |
| --- | --- | --- |
| style | *(Object)* | An object containing valid style declarations |

## Returns
*(Object)* an object containing all style declarations with vendor prefixes.

## Example
```javascript
import { prefix } from 'inline-style-prefixer'

const style = { 
  alignItems: 'center'
}

const output = prefix(style)

output === {
  WebkitAlignItems: 'space-around',
  msAlignItems: 'space-around',
  alignItems: 'space-around',
  // it also adds legacy properties and values
  // by running every plugin available
  WebkitBoxAlign: 'justify',
  msFlexAlign: 'distribute'
}
```
