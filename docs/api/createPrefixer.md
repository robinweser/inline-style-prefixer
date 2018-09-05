# createPrefixer

Creates a [prefix](prefix.md) function with a custom browser support range. It should be used together with the [generateData](generator/generateData.md) API to generate the required data.

## Arguments
| Argument | Type | Description |
| --- | --- | --- |
| data | *(Object)* | an object containing the a valid *prefixMap* and a *plugins* list |

## Returns
*(Function)*: custom [prefix](prefix.md) function

## Example
```javascript
import { createPrefixer } from 'inline-style-prefixer'

const prefix = createPrefixer({
  prefixMap: __YOUR_PREFIX_MAP__,
  plugins: __YOUR_PLUGINS__
})
```
