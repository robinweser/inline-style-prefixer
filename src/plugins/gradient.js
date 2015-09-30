const properties = ['background', 'backgroundImage']
const values = ['linear-gradient', 'radial-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient']

export default (property, value, {browser, version, prefix}) => {
  if (properties.indexOf(property) > -1 && values.indexOf(value) > -1 && browser === 'firefox' && version < 16 || browser === 'chrome' && version < 26 || (browser === 'safari' || browser === 'ios_saf') && version < 7 || (browser === 'opera' || browser === 'op_mini') && version < 12.1 || browser === 'android' && version < 4.4 || browser === 'and_uc') {
    return {
      [property]: prefix.CSS + value
    }
  }
}