// leight polyfill for Object.assign
export default (base, extend = {}) => {
  Object.keys(extend).forEach(key => base[key] = extend[key])
  return base
}
