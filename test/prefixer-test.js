import {expect} from 'chai';
import Prefixer from '../lib/prefixer';

describe('Prefixing', () => {
	it('should generate correct required prefixes according to userAgent', () => {
			expect(Prefixer.generateRequiredProperties('MSIE 11.0')).to.eql(['userSelect']);
	});
});