import generateData from './modules/generator'

const defaultBrowserSupport = {
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

generateData(defaultBrowserSupport, {
  staticPath: `${__dirname}/modules/static/staticData.js`,
  dynamicPath: `${__dirname}/modules/dynamic/dynamicData.js`,
  compatibility: false,
  prefixData: true,
  plugins: false
})
