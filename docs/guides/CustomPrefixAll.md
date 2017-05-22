# Creating your own prefixAll

This guide is quite similar to [Creating your own Prefixer](CustomPrefixer.md), but focuses on the static prefixer version.
Make sure to read it first, as it describes the concepts with much more detail, as not everything is repeated here as well.

## Generating static data
First of all we need to install the `caniuse-api`.

```sh
yarn add caniuse-api --dev
```

Again, we are using [`generateData`](../api/inline-style-prefixer-generator/generateData.md) and a `browserList` to get our static data. This we will save the data to the `staticPath`.

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
  staticPath: `${__dirname}/modules/static/staticData.js`
})
```

## Creating the prefixAll
Now that we have the data, we simply need to use the `createPrefixer` helper.

```javascript
import createPrefixer from 'inline-style-prefixer/static/createPrefixer'

import staticData from './modules/static/staticData'

const prefixAll = createPrefixer(staticData)
```
