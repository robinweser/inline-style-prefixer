// only throw warnings if devmode is enabled
export default (...message) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(...message)
  }
}
