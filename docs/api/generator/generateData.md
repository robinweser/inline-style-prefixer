# generateData

> You need to have the `caniuse-api` package installed.

```sh
yarn add caniuse-api --dev
```

Generates all the data needed to create your own prefix function. It uses a list of browser versions to determine the required prefixes. It also writes the data to a file if `path` is provided. The files are directly written in valid JavaScript, so that they can be imported and used as is.

The files always export an object with two keys: *prefixMap* and *plugins*.

## Arguments
| Argument | Type | Description |
| --- | --- | --- |
| browserList | *(Object)* | An object containing a browser:version mapping used to generate the required prefixes |
| options | *(Object?)* | generator configurations |

## Returns
*(Object)* generated data as an object with the keys *prefixMap* and *plugins*.

## Options
| Option | Value  | Default | Description |
| --- | --- | --- | --- |
| path  | *(string?)* |  | Filepath where the generated data is saved |
| compatibility  | *(boolean?)* | `false` | Save the data in valid ES5 syntax *(default is ES2015)* |
| prefixMap  | *(boolean?)* | `true` | Generate (and save) the prefixMap |
| plugins  | *(boolean?)* | `true`  | Generate (and save) the plugin list |


## Example
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
  path: `PATH_TO_ASSETS/data.js`,
  compatibility: false,
  prefixMap: true,
  plugins: false
})
```
