import createPrefixer from './createPrefixer'

import propertyPrefixMap from './propertyPrefixMap'
import plugins from './plugins'

export default createPrefixer(propertyPrefixMap, plugins)
