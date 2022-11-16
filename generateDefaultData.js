import generateData from './modules/generator'

const defaultBrowserSupport = {
  chrome: 80,
  android: 8,
  firefox: 70,
  ios_saf: 13,
  safari: 13,
  ie: 12,
  edge: 18,
  opera: 55,
  op_mini: 12,
  and_chr: 80,
}

generateData(defaultBrowserSupport, {
  path: `${__dirname}/modules/data.js`,
  plugins: true,
})
