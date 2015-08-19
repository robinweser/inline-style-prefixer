export default {
	condition(info) {
			return info.prefix == 'Webkit' || info.prefix == 'Moz' && info.version <= 23;
		},

		alternatives(info) {
			return {
				cursor: {
					'zoom-in': info.css + 'zoom-in',
					'zoom-out': info.css + 'zoom-out',
					'grab': info.css + 'grab',
					'grabbing': info.css + 'grabbing'
				}
			}
		}
}