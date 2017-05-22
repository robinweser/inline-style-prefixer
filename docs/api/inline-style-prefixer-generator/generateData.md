# `generateData(browserList, options)`

> You need to have the `caniuse-api` package installed.

```sh
yarn add caniuse-api --dev
```

Generates all the data needed to create your own prefixer. It uses a list of browser versions to determine the required prefixes. It also writes the data to files if `staticPath` and/or `dynamicPath` is provided. The files are directly written in valid JavaScript, so that they can be imported and used as is.

The files always have the following shape (ES2015 example):
```javascript
// 1-n plugins if options.plugins !== false
// type is either 'static' or 'dynamic'
import PLUGIN_NAME from 'inline-style-prefixer/{type}/plugins/PLUGIN_NAME'
...

export default {
  // contains all the prefix data for each browser/prefix
  // as long as options.prefixMap !== false
  prefixMap: { ... },
  // an array containing all plugins if options.plugisn !== false
  plugins: [ PLUGIN_NAME ]
}
```

## Arguments
1. `browserList` (*Object*): An object containing a browser:version mapping used to generate the required prefixes
2. `options` (*Object*): An object containing the generator configurations

## Returns
(*Object*): Returns the generated data as an object with the keys `plugins`, `static` and `dynamic`.

## Options
| Option | Value  | Default | Description |
| ------ | ------ | ------  |  ---------  |
| staticPath  | *(string)* |  | Filepaths where the generated static data is saved |
| dynamicPath  | *(string)* |  | Filepaths where the generated dynamic data is saved |
| compatibility  | *(boolean)* | `false` | Save the data in valid ES5 syntax *(default is ES2015)* |
| prefixMap  | *(boolean)* | `true` | Generate (and save) the prefixMap |
| plugins  | *(boolean)* | `true`  | Generate (and save) the plugin list |


## Example
```javascript
import generateData from 'inline-style-prefixer/generator'

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
  staticPath: `${__dirname}/prefixData/static.js`,
  dynamicPath: `${__dirname}/prefixData/dynamic.js`,

  compatibility: false,
  prefixMap: true,
  plugins: false
})
```
