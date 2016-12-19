const values = { flex: true, 'inline-flex': true }

export default function flex(property, value, style) {
  if (property === 'display' && values[value]) {
    style.display = [ '-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value ]
  }
}
