function condition(browserInfo) {
	return browserInfo.msie && browserInfo.version == 10
}

export default function hack(browserInfo) {
	if (condition(browserInfo)) {

		let msValues = {
			'space-around': 'distribute',
			'space-between': 'justify',
			'flex-start': 'start',
			'flex-end': 'end'
		};

		return {
			alternativeProperty: {
				'justifyContent': 'msFlexPack',
				'alignItems': 'msFlexAlign',
				'alignContent': 'msFlexLinePack',
				'order': 'msFlexOrder',
				'alignSelf': 'msFlexItemAlign',
				'flexGrow': 'msFlexPositive',
				'flexShrink': 'msFlexNegative',
				'flexBasis': 'msPreferredSize'
			},
			alternativeValue: {
				justifyContent: msValues,
				alignContent: msValues,
				display: {
					'flex': browserInfo.prefix.CSS + 'flexbox',
					'inline-flex': browserInfo.prefix.CSS + 'inline-flexbox'
				}
			}
		}
	} else {
		return false
	}
}
