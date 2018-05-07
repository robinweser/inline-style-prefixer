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

function filterAndRemoveIfEmpty(
  map: Object,
  property: string,
  filter: Function
): void {
  if (map[property]) {
    map[property] = map[property].filter(filter)

    if (map[property].length === 0) {
      delete map[property]
    }
  }
}

export default function generateStaticPrefixMap(browserList: Object): Object {
  const prefixMap = {}

  for (const browser in prefixBrowserMap) {
    const prefix = prefixBrowserMap[browser]

    for (const keyword in propertyMap) {
      const keywordProperties = [].concat(propertyMap[keyword])
      const versions = getSupport(keyword)

      for (let i = 0, len = keywordProperties.length; i < len; ++i) {
        if (versions[browser].x >= browserList[browser]) {
          const property = keywordProperties[i]
          if (!prefixMap[property]) {
            prefixMap[property] = []
          }

          if (prefixMap[property].indexOf(prefix) === -1) {
            prefixMap[property].push(prefix)
          }
        }
      }
    }
  }

  // remove flexProps from IE and Firefox due to alternative syntax
  for (let i = 0, len = flexPropsIE.length; i < len; ++i) {
    filterAndRemoveIfEmpty(
      prefixMap,
      flexPropsIE[i],
      prefix => prefix !== 'ms' && prefix !== 'Moz'
    )
  }

  // remove transition from Moz and Webkit as they are handled
  // specially by the transition plugins
  filterAndRemoveIfEmpty(
    prefixMap,
    'transition',
    prefix => prefix !== 'Moz' && prefix !== 'Webkit'
  )

  // remove WebkitFlexDirection as it does not exist
  filterAndRemoveIfEmpty(prefixMap, 'flexDirection', prefix => prefix !== 'Moz')

  return prefixMap
}
