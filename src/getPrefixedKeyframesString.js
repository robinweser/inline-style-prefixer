export default ({browser, version, prefix}) => {
  let keyframesString = 'keyframes'
  if (browser === 'chrome' && version < 43 || (browser === 'safari' || browser === 'ios_saf') && version < 9 || browser === 'opera' && version < 30 || browser === 'android' && version <= 4.4 || browser === 'and_uc') {
    keyframesString = prefix.CSS + keyframesString
  }
  return keyframesString
}
