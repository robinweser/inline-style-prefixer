function condition(browserInfo) {
  return browserInfo.android && browserInfo.version < 4.4
}

export default function hack(browserInfo) {
  if (condition(browserInfo)) {

    let alignValues = {
      'space-around': 'justify',
      'space-between': 'justify',
      'flex-start': 'start',
      'flex-end': 'end'
    }

    return {
      alternativeProperty: {
        alignItems: 'WebkitBoxAlign',
        justifyContent: 'WebkitBoxPack',
        flexWrap: 'WebkitBoxLines',
        flexDirection: ['WebkitBoxOrient', 'WWebkitBoxDirection']
      },
      alternativeValue: {
        justifyContent: alignValues,
        alignContent: alignValues,
        WebkitBoxLines: {
          'wrap-reverse': 'multiple',
          'wrap': 'multiple'
        },
        WebkitBoxOrient: {
          'column': 'vertical',
          'column-reverse': 'vertical',
          'row': 'horizontal',
          'row-reverse': 'horizontal'
        },
        WebkitBoxDirection: {
          'column': 'normal',
          'column-reverse': 'reverse',
          'row': 'normal',
          'row-reverse': 'reverse'
        },
        display: {
          'flex': browserInfo.prefix.CSS + 'box',
          'inline-flex': browserInfo.prefix.CSS + 'inline-box'
        }
      }
    }
  } else {
    return false
  }
}

