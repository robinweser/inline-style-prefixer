// light polyfill for Object.assign
export default (base, extend = { }) => Object.keys(extend).reduce((out, key) => {
  out[key] = extend[key]
  return out
}, base)
