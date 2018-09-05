# Creating your own prefixer

If your application requires different browser version support, you might consider creating your own prefix function. To make it as simple as possible, we provide two different tools to get there. First of all, we use the [generateData](../api/generator/generateData.md) API that helps to generate the required prefixing data. Then, we use the [createPrefixer](../api/createPrefixer.md) API to plug it all together.

## Generating the data
First of all we need to install the `caniuse-api`.

```sh
yarn add caniuse-api --dev
```

Our prefix method needs to know which properties to prefix and which plugins to use. This data can be generated using the [generateData](../api/generator/generateData.md) API.
You need to provide a `browserList` containing all the minimum browser versions that should be supported.

It will then generate the required data and save it to `path`. Check out the [generateData API reference](../api/geneartor/generateData.md) for detailed information on all the options and advanced settings.

```javascript
import generateData from 'inline-style-prefixer/lib/generator'

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
  path: `PATH_TO_ASSETS/prefixData.js`
})
```

## Creating the prefix function
Now that we have the data, we pass it over to the [createPrefixer](../api/createPrefixer) API.

```javascript
import { createPrefixer } from 'inline-style-prefixer'

import prefixData from 'PATH_TO_ASSETS/prefixData'

const prefix = createPrefixer(prefixData)
```
