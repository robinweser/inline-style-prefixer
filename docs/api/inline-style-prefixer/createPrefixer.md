# `createPrefixer(data, staticFallback)`

Creates a custom `Prefixer` class with your custom browser support range. It should be used together with `generateData` provided by `inline-style-prefixer/generator` to generate the required `data`.

## Arguments
1. `data` (*Object*): An object containing the **prefixMap** and **plugins** list <br>- *(generated with [inline-style-prefixer/generator](../inline-style-prefixer-generator/generateData.md) - check [how to generate your own](../../guides/CustomPrefixer.md))*
2. `staticFallback` (*Function*): A static prefixer which is used as a fallback<br>- *(It should be generated using the [inline-style-prefixer/generator](../inline-style-prefixer-generator/generateData.md) together with the static [`createPrefixer`](../inline-style-prefixer-static/createPrefixer.md))*

## Returns
(*class*): Returns a custom `Prefixer` class.

## Example
```javascript
import createPrefixer from 'inline-style-prefixer/dynamic/createPrefixer'

import dynamicData from './generatedData'
import staticFallback from './staticFallback'

export default createPrefixer(
  dynamicData,
  staticFallback
)
```
which can the be used e.g.
```javascript
import Prefixer from './customPrefixer'

const prefixer = new Prefixer({
  userAgent: '',
  keepUnprefixed: false
})

const prefixed = prefixer.prefix({
  transition: '300ms all linear',
  flex: 1
})
```
