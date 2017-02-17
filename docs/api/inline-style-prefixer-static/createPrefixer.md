# `createPrefixer(data)`

Creates a custom static prefixer function with your custom browser support range. It should be used together with `generateData` provided by `inline-style-prefixer/generator` to generate the required `data`.

## Arguments
1. `data` (*Object*): An object containing the **prefixMap** and **plugins** list <br>- *(generated with [inline-style-prefixer/generator](../inline-style-prefixer-generator/generateData.md) - check [how to generate your own](../../guides/CustomPrefixAll.md))*

## Returns
(*Function*): Returns a custom `prefixAll` function.

## Example
```javascript
import createPrefixer from 'inline-style-prefixer/static/createPrefixer'

import staticData from './generatedData'

export default createPrefixer(
  staticData
)
```

which can the be used e.g.
```javascript
import prefixAll from './customPrefixAll'

const prefixed = prefixAll({
  transition: '300ms all linear',
  flex: 1
})
```
