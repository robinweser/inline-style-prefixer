const chai = require('chai')
const createDynamicPrefixer = require('../../modules/dynamic/createPrefixer')
const dynamicPlugins = require('../../modules/dynamic/plugins')

const createStaticPrefixer = require('../../modules/static/createPrefixer')
const staticPlugins = require('../../modules/static/plugins')

const generateData = require('../../modules/generator')

const gradientData = require('../data/gradient.json').gradient

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

const data = generateData(browserList)

const prefixAll = createStaticPrefixer({
  prefixMap: data.static,
  plugins: staticPlugins
})
const Prefixer = createDynamicPrefixer(
  {
    prefixMap: data.dynamic,
    plugins: dynamicPlugins
  },
  prefixAll
)

global.expect = chai.expect
global.prefixAll = prefixAll
global.Prefixer = Prefixer

// data for tests.
global._data = { gradient: gradientData }
