export default {
	condition(info) {
			return info.browser == 'ie' && info.version == 10;
		},

		properties() {
			return {
				'justifyContent': 'msFlexPack',
				'alignItems': 'msFlexAlign',
				'alignContent': 'msFlexLinePack',
				'order': 'msFlexOrder',
				'alignSelf': 'msFlexItemAlign',
				'flexGrow': 'msFlexPositive',
				'flexShrink': 'msFlexNegative',
				'flexBasis': 'msPreferredSize'
			}
		},

		values() {
			return {
				justifyContent: {
					'space-around': 'distribute',
					'space-between': 'justify',
					'flex-start': 'start',
					'flex-end': 'end'
				},
				alignContent: {
					'space-around': 'distribute',
					'space-between': 'justify',
					'flex-start': 'start',
					'flex-end': 'end'
				}
			}
		},

		alternatives(info) {
			return {
				display: {
					'flex': info.css + 'flexbox',
					'inline-flex': info.css + 'inline-flexbox'
				}
			}
		}
}