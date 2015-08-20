let caniuse = require('caniuse-api');
import searchMap from './searchMap';
import fs from 'fs';



function gatherInformation() {
	let prefixProperties = {
		ie: {},
		firefox: {},
		safari: {},
		chrome: {},
		opera : {}
	};

	let search;
	for (search in searchMap) {
		let properties = searchMap[search];
		let versions = caniuse.getSupport(search, true);
		if (properties instanceof Array !== true) {
			properties = [properties];
		}
		properties.forEach(prop => {
			let prefix;
			for (prefix in prefixProperties) {
				prefixProperties[prefix][prop] = versions[prefix].x
			}
		});
	}
	return 'var prefixes = ' + JSON.stringify(prefixProperties) + '; module.exports = prefixes';

}

fs.writeFile('./lib/data.js', gatherInformation(), err => {
	if (err) throw err;
	console.log("Successfully generated prefix data.");
});