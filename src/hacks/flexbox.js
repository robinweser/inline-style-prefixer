function condition(browserInfo) {
	return browserInfo.prefix.inline == 'Webkit';
}

export default function hack(browserInfo) {
	if (condition(browserInfo)) {

		return {
			prefixValue: {
				display: ['flex', 'inline-flex']
			}
		}
	} else {
		return false
	}
}
