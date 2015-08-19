export default {
	condition(info) {
			return info.prefix == 'Webkit';
		},

		alternatives(info) {
			return {
				display: {
					'flex': info.css + 'flex',
					'inline-flex': info.css + 'inline-flex'
				}
			}
		}
}