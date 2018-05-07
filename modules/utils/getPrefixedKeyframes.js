/* @flow */
export default function getPrefixedKeyframes(
  browserName: string,
  browserVersion: number,
  cssPrefix: string
): string {
  const prefixedKeyframes = 'keyframes'

  if (
    (browserName === 'chrome' && browserVersion < 43) ||
    ((browserName === 'safari' || browserName === 'ios_saf') &&
      browserVersion < 9) ||
    (browserName === 'opera' && browserVersion < 30) ||
    (browserName === 'android' && browserVersion <= 4.4) ||
    browserName === 'and_uc'
  ) {
    return cssPrefix + prefixedKeyframes
  }
  return prefixedKeyframes
}
