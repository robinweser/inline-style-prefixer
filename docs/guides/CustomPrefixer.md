# Creating your own Prefixer

If your application requires different browser version support, you might consider creating your own `Prefixer`. To make it as simple as possible, we provide two different tools to get there. First of all, we have the [inline-style-prefixer/generator](../api/inline-style-prefixer-generator/generateData.md) that helps to generate the required prefixing data. Then, you can use [`createPrefixer`](../api/inline-style-prefixer/createPrefixer.md) to plug it all together.

## Generating dynamic data
Each Prefixer needs to know which properties to prefix and which plugins to use. This data can be generated using [`generateData`](../api/inline-style-prefixer-generator/generateData.md).
You need to provide a `browserList` containing all the minimum browser versions that should be supported.

It will then generate the required data and save it to `dynamicPath`. Check out the [`generateData` API reference](../api/inline-style-prefixer-generator/generateData.md) for detailed information on all the options and advanced settings.

```javascript
import generateData from './modules/generator'

const browserList = {
  chrome: 46,
  android: 4,
  firefox: 40,
  ios_saf: 8,
  safari: 8,
  ie: 11,
  ie_mob: 11,
  edge: 12,
  opera: 16,
  op_mini: 12,
  and_uc: 9,
  and_chr: 46
}

generateData(browserList, {
  dynamicPath: `${__dirname}/modules/dynamic/dynamicData.js`
})
```

## Creating the Prefixer
Now that we have the data, we simply need to use the `createPrefixer` helper.
> As the dynamic prefixer uses the static prefixer as a fallback, we also need to provide a static fallback. We recommend to [generate your own `prefixAll`](CustomPrefixAll.md)-method using the same `browserList` for compatibility reasons.

```javascript
import createPrefixer from 'inline-style-prefixer/dynamic/createPrefixer'

import dynamicData from './modules/dynamic/dynamicData'
import prefixAll from './modules/static/prefixAll'

const Prefixer = createPrefixer(dynamicData, prefixAll)

const prefixer = new Prefixer()
```
