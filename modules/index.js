import createPrefixer from './createPrefixer'

import data from './data'

import backgroundClip from './plugins/backgroundClip'
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

const plugins = [
  backgroundClip,
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

const prefix = createPrefixer({
  prefixMap: data.prefixMap,
  plugins,
})

export { createPrefixer, prefix }
