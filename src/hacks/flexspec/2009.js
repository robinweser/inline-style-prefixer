function condition(browserInfo){
	return browserInfo.prefix.inline == 'Webkit' && browserInfo.android &&  browserInfo.version < 4.4;
}

export default function hack(browserInfo) {
	if (condition(browserInfo)){

		return {
			prefixValue: {},
			alternativeProperty : {},
			alternativeValue: {}
		}
	} else {
		return false;
	}
}
