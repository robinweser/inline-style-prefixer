const chai = require('chai')
const createDynamicPrefixer = require('../../modules/dynamic/createPrefixer')
const dynamicPlugins = require('../../modules/dynamic/plugins').default

const createStaticPrefixer = require('../../modules/static/createPrefixer')
const staticPlugins = require('../../modules/static/plugins').default

const generator = require('../../modules/generator')

const browserList = {
  chrome: 0,
  android: 0,
  firefox: 0,
  ios_saf: 0,
  safari: 0,
  ie: 0,
  ie_mob: 0,
  edge: 0,
  opera: 0,
  op_mini: 0,
  and_uc: 0,
  and_chr: 0
}

const fallback = createStaticPrefixer(
  generator.generateStaticPrefixPropertyMap(browserList),
  staticPlugins
)

const Prefixer = createDynamicPrefixer(
  generator.generateDynamicPrefixPropertyMap(browserList),
  dynamicPlugins,
  fallback
)

global.expect = chai.expect
global.prefixAll = fallback
global.Prefixer = Prefixer
