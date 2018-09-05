/* @flow */
import pluginMap from './maps/pluginMap'

export default function getRecommendedPlugins(
  browserList: Object
): Array<string> {
  const recommendedPlugins = {}

  for (const plugin in pluginMap) {
    const browserSupportByPlugin = pluginMap[plugin]

    for (const browser in browserSupportByPlugin) {
      if (browserList.hasOwnProperty(browser)) {
        const browserVersion = browserSupportByPlugin[browser]

        if (browserList[browser] < browserVersion) {
          recommendedPlugins[plugin] = true
        }
      }
    }
  }

  return Object.keys(recommendedPlugins)
}
