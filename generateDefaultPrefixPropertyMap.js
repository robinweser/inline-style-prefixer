import {
  generateStaticPrefixPropertyMap,
  generateDynamicPrefixPropertyMap,
  getRecommendedPlugins,
  savePrefixPropertyMap
} from './modules/generator'

const defaultBrowserSupport = {
  chrome: 46,
  android: 4,
  firefox: 0,
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

console.log(getRecommendedPlugins(defaultBrowserSupport))

function generateDefaultPrefixPropertyMap() {
  const staticMap = generateStaticPrefixPropertyMap(defaultBrowserSupport)
  const dynamicMap = generateDynamicPrefixPropertyMap(defaultBrowserSupport)

  savePrefixPropertyMap(staticMap, `${__dirname}/modules/static/propertyPrefixMap.js`, false)
  savePrefixPropertyMap(dynamicMap, `${__dirname}/modules/dynamic/propertyPrefixMap.js`, false)
}

generateDefaultPrefixPropertyMap()
