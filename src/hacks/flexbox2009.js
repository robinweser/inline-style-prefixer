export default {
	condition(info) {
			return info.prefix == 'Webkit' && info.version < 4.4;
		},

		values() {
			return {
				alignItems: true
			}
		}
}