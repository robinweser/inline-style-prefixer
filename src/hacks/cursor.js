function condition(browserInfo) {
	return browserInfo.prefix.inline == 'Webkit' || browserInfo.prefix.inline == 'Moz' && browserInfo.version <= 23;
}

export default function hack(browserInfo) {
	if (condition(browserInfo)) {

		return {
			prefixValue: {
				cursor: ['zoom-in', 'zoom-out', 'grab', 'grabbing']
			}
		}
	} else {
		return false;
	}
}