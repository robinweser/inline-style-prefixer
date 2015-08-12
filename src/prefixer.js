import prefixProperties from './data';
import checkBrowser from './checkBrowser';

let requiredProperties = [];
let ua = (typeof navigator !== 'undefined' ? navigator.userAgent : undefined);
let generated = false;

export default {
	setUserAgent(userAgent) {
			ua = userAgent;
			this.generateRequiredProperties();
		},

		getUserAgent() {
			return ua;
		},

		generateRequiredProperties(userAgent = ua) {
			if (userAgent) {
				let browserInformation = checkBrowser(userAgent);
				let browserData = prefixProperties[browserInformation.browser];
				
				let prop;
				for (prop in browserData){
					if (browserData[prop] >= browserInformation.version){
						requiredProperties.push(prop);
					}
				}
			} else {
				console.warn('There is no userAgent specified.');
			}
			
			return requiredProperties;
		},

		process(styles) {
			if (generated) {

			} else {
				console.warn('Use .generatedRequiredProperties() first to create a prefix-property map.');
			}
		}
}