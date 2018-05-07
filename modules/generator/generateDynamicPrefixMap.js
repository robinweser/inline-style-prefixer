/* @flow */
import { getSupport } from 'caniuse-api'

import propertyMap from './maps/propertyMap'

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
  ie_mob: 'ms',
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
  'flexBasis',
]

export default function generateDynamicPrefixMap(browserList: Object): Object {
  const prefixMap = {}

  for (let i = 0, len = browsers.length; i < len; ++i) {
    const browser = browsers[i]
    if (!prefixMap.hasOwnProperty(browser)) {
      prefixMap[browser] = {}
    }

    for (const keyword in propertyMap) {
      const keywordProperties = [].concat(propertyMap[keyword])
      const versions = getSupport(keyword)

      for (let j = 0, kLen = keywordProperties.length; j < kLen; ++j) {
        if (versions[browser].x >= browserList[browser]) {
          prefixMap[browser][keywordProperties[j]] = versions[browser].x
        }
      }
    }
  }

  prefixMap.ie = {
    ...prefixMap.ie,
    ...prefixMap.ie_mob,
  }

  delete prefixMap.ie_mob

  // remove flexProps from IE due to alternative syntax
  for (let i = 0, len = flexPropsIE.length; i < len; ++i) {
    delete prefixMap.ie[flexPropsIE[i]]
  }

  return prefixMap
}
