import generateData from './modules/generator'

const defaultBrowserSupport = {
  chrome: 55,
  android: 5,
  firefox: 52,
  ios_saf: 9,
  safari: 9,
  ie: 11,
  ie_mob: 11,
  edge: 12,
  opera: 30,
  op_mini: 12,
  and_uc: 11,
  and_chr: 55,
}

generateData(defaultBrowserSupport, {
  path: `${__dirname}/modules/data.js`,
  plugins: false,
})
