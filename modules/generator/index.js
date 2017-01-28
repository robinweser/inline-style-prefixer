/* @flow */
// .getBrowserScope to check for available browsers
// .find to see all keywords
import { getSupport } from 'caniuse-api'

import propertyKeywordMap from './propertyKeywordMap'
import pluginVersionMap from './pluginVersionMap'

const prefixBrowserMap = {
  chrome: 'Webkit',
  safari: 'Webkit',
  firefox: 'Moz',
  opera: 'Webkit',
  ie: 'ms',
  edge: 'ms',
  ios_saf: 'Webkit',
  android: 'Webkit',
  and_chr: 'Webkit',
  and_uc: 'Webkit',
  op_mini: 'Webkit',
  ie_mob: 'ms'
}

const browsers = Object.keys(prefixBrowserMap)

// remove flexprops from IE
const flexPropsIE = [
  'alignContent',
  'alignSelf',
  'alignItems',
  'justifyContent',
  'order',
  'flexGrow',
  'flexShrink',
  'flexBasis'
]

function filterAndRemoveIfEmpty(map: Object, property: string, filter: Function): void {
  map[property] = map[property].filter(filter)

  if (map[property].length === 0) {
    delete map[property]
  }
}

export function generateStaticPrefixPropertyMap(browserList: Object): Object {
  const prefixPropertyMap = {}

  for (const browser in prefixBrowserMap) {
    const prefix = prefixBrowserMap[browser]

    for (const keyword in propertyKeywordMap) {
      const keywordProperties = [].concat(propertyKeywordMap[keyword])
      const versions = getSupport(keyword)

      for (let i = 0, len = keywordProperties.length; i < len; ++i) {
        if (versions[browser].x >= browserList[browser]) {
          const property = keywordProperties[i]
          if (!prefixPropertyMap[property]) {
            prefixPropertyMap[property] = []
          }

          if (prefixPropertyMap[property].indexOf(prefix) === -1) {
            prefixPropertyMap[property].push(prefix)
          }
        }
      }
    }
  }

  // remove flexProps from IE and Firefox due to alternative syntax
  for (let i = 0, len = flexPropsIE.length; i < len; ++i) {
    filterAndRemoveIfEmpty(
      prefixPropertyMap,
      flexPropsIE[i],
      prefix => prefix !== 'ms' && prefix !== 'Moz'
    )
  }

  // remove transition from Moz and Webkit as they are handled
  // specially by the transition plugins
  filterAndRemoveIfEmpty(
    prefixPropertyMap,
    'transition',
    prefix => prefix !== 'Moz' && prefix !== 'Webkit'
  )

  // remove WebkitFlexDirection as it does not exist
  filterAndRemoveIfEmpty(prefixPropertyMap, 'flexDirection', prefix => prefix !== 'Moz')

  return prefixPropertyMap
}

export function generateDynamicPrefixPropertyMap(browserList: Object): Object {
  const prefixPropertyMap = {}

  for (let i = 0, len = browsers.length; i < len; ++i) {
    const browser = browsers[i]
    if (!prefixPropertyMap[browser]) {
      prefixPropertyMap[browser] = {}
    }

    for (const keyword in propertyKeywordMap) {
      const keywordProperties = [].concat(propertyKeywordMap[keyword])
      const versions = getSupport(keyword)

      for (let j = 0, kLen = keywordProperties.length; j < kLen; ++j) {
        if (versions[browser].x >= browserList[browser]) {
          prefixPropertyMap[browser][keywordProperties[j]] = versions[browser].x
        }
      }
    }
  }

  prefixPropertyMap.ie = {
    ...prefixPropertyMap.ie,
    ...prefixPropertyMap.ie_mob
  }

  delete prefixPropertyMap.ie_mob

  // remove flexProps from IE due to alternative syntax
  for (let i = 0, len = flexPropsIE.length; i < len; ++i) {
    delete prefixPropertyMap.ie[flexPropsIE[i]]
  }

  return prefixPropertyMap
}

export function getRecommendedPlugins(browserList: Object): Array<string> {
  const recommendedPlugins = {}

  for (const plugin in pluginVersionMap) {
    const browserSupportByPlugin = pluginVersionMap[plugin]

    for (const browser in browserSupportByPlugin) {
      if (browserList[browser]) {
        const browserVersion = browserSupportByPlugin[browser]

        if (browserList[browser] < browserVersion) {
          recommendedPlugins[plugin] = true
        }
      }
    }
  }

  return Object.keys(recommendedPlugins)
}

export function savePrefixPropertyMap(
  prefixPropertyMap: Object,
  path: string,
  compatibility: ?boolean = false
): void {
  /* eslint-disable global-require */
  const fs = require('fs')
  /* eslint-enable global-require */
  const exportMode = compatibility ? 'module.exports = ' : 'export default '
  fs.writeFile(path, exportMode + JSON.stringify(prefixPropertyMap), (err) => {
    if (err) {
      throw err
    }

    console.log(
      `Successfully saved the prefix property map to "${path}". (compatibility mode: ${compatibility
        ? '"on"'
        : '"off"'})`
    )
  })
}
