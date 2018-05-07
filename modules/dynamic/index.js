import createPrefixer from './createPrefixer'

import cursor from './plugins/cursor'
import crossFade from './plugins/crossFade'
import filter from './plugins/filter'
import flex from './plugins/flex'
import flexboxOld from './plugins/flexboxOld'
import gradient from './plugins/gradient'
import imageSet from './plugins/imageSet'
import position from './plugins/position'
import sizing from './plugins/sizing'
import transition from './plugins/transition'

import prefixAll from '../static'
import dynamicData from './dynamicData'

const plugins = [
  crossFade,
  cursor,
  filter,
  flexboxOld,
  gradient,
  imageSet,
  position,
  sizing,
  transition,
  flex,
]

const Prefixer = createPrefixer(
  {
    prefixMap: dynamicData.prefixMap,
    plugins,
  },
  prefixAll
)
export default Prefixer
