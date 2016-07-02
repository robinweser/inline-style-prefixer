const values = { flex: true, 'inline-flex': true }

export default function flex(property, value) {
  if (property === 'display' && values[value]) {
    return {
      display: [ '-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value ]
    }
  }
}
