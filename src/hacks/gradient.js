function condition(browserInfo) {
  return browserInfo.browser == 'chrome' && browserInfo.version <= 25 || browserInfo.browser == 'firefox' && browserInfo.version <= 15 || browserInfo.browser == 'opera' && browserInfo.version == 11.5 || browserInfo.browser == 'safari' && browserInfo.version <= 6.1
}

export default function hack(browserInfo) {
  if (condition(browserInfo)) {

    let gradients = ['linear-gradient', 'radial-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient']

    return {
      prefixValue: {
        background: gradients,
        backgroundImage: gradients
      },
      containValue: true
    }
  } else {
    return false
  }
}