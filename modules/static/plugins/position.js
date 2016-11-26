export default function position(property, value) {
  if (property === 'position' && value === 'sticky') {
    return { position: [ '-webkit-sticky', 'sticky' ] }
  }
}
