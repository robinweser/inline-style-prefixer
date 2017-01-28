import createPrefixer from './createPrefixer'

import propertyPrefixMap from './propertyPrefixMap'
import plugins from './plugins'

import fallback from '../static'

export default createPrefixer(propertyPrefixMap, plugins, fallback)
