export default function position(property, value, style) {
  if (property === 'position' && value === 'sticky') {
    style.position = [ '-webkit-sticky', 'sticky' ]
  }
}
