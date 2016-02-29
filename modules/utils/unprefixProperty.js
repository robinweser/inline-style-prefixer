export default property => {
  const unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '')
  return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1)
}
