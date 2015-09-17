import {expect} from 'chai';
import Prefixer, {caplitalizeString, generateRequiredProperties, generatePrefixedProperty} from '../lib/index';

describe('Generating required properties', () => {

	it('should return the current userAgent', () => {
		expect(Prefixer.getUserAgent()).to.eql(undefined);
	});


	it('should set a custom userAgent', () => {
		let userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36'
		Prefixer.setUserAgent(userAgent);
		expect(Prefixer.getUserAgent()).to.equal(userAgent);
	});


	it('should return correct properties according to userAgent', () => {
		let Chrome45Props = generateRequiredProperties();
		let IE11Props = generateRequiredProperties('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko');

		expect(IE11Props).to.include('userSelect');
		expect(Chrome45Props).to.include('appearance').and.to.include('userSelect');
	});
});



describe('Prefixing a property', () => {

	it('should capitalize a property', () => {
		expect(caplitalizeString('test')).to.eql('Test');
	});


	it('should return a prefixed property', () => {
		Prefixer.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36');
		expect(generatePrefixedProperty('transition')).to.eql('WebkitTransition');
		expect(generatePrefixedProperty('transitionDuration')).to.eql('WebkitTransitionDuration');

		Prefixer.setUserAgent('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko');
		expect(generatePrefixedProperty('transition')).to.eql('msTransition');
	});


	it('should only add required prefixes', () => {
		let input = {
			appearance: 'test',
			transition: 'test',
		};

		let output = {
			WebkitAppearance: 'test',
			appearance: 'test',
			transition: 'test'
		}
		Prefixer.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36');
		expect(Prefixer.process(input)).to.eql(output);

		let input2 = {
			appearance: 'test',
			transition: 'test'
		};
		Prefixer.setUserAgent('Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36');
		expect(Prefixer.process(input2)).to.eql(input2);
	});
});


describe('Resolving hacks', () => {

	it('should resolve properties', () => {
		let input = {
			alignItems: 'center'
		};

		let output = {
			msFlexAlign: 'center',
			msAlignItems: 'center',
			alignItems: 'center'
		}
		Prefixer.setUserAgent('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
		expect(Prefixer.process(input)).to.eql(output);
	});



	it('should resolve alternatives', () => {
		let input = {
			display: 'flex'
		};

		let output = {
			display: '-webkit-flex;display:flex'
		}

		Prefixer.setUserAgent('Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.815.0 Safari/535.1');
		expect(Prefixer.process(input)).to.eql(output);
	});

	it('should resolve values', () => {
		let input = {
			justifyContent: 'space-between'
		};

		let output = {
			justifyContent: 'justify;justify-content:space-between'
		}
		Prefixer.setUserAgent('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
		let prefixed = Prefixer.process(input);
		expect(prefixed.justifyContent).to.equal('justify;justify-content:space-between');
		expect(prefixed).to.have.property('msFlexPack');
	});
});
