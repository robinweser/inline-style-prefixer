import {expect} from 'chai';
import Prefixer, {caplitalizeString, generateRequiredProperties, generatePrefixedProperty} from '../lib/index';

describe('Generating required properties', () => {

	it('should return the current userAgent', () => {
		expect(Prefixer.getUserAgent()).to.eql(undefined);
	});


	it('should set a custom userAgent', () => {
		let userAgent = 'Chrome/ 45.0';
		Prefixer.setUserAgent(userAgent);
		expect(Prefixer.getUserAgent()).to.equal(userAgent);
	});


	it('should return correct properties according to userAgent', () => {
		let Chrome45Props = generateRequiredProperties();
		let IE11Props = generateRequiredProperties('MSIE 11.0');

		expect(IE11Props).to.include('userSelect');
		expect(Chrome45Props).to.include('appearance').and.to.include('userSelect');
	});
});



describe('Prefixing a property', () => {

	it('should capitalize a property', () => {
		expect(caplitalizeString('test')).to.eql('Test');
	});


	it('should return a prefixed property', () => {
		Prefixer.setUserAgent('Chrome/ 45.0');
		expect(generatePrefixedProperty('transition')).to.eql('WebkitTransition');
		expect(generatePrefixedProperty('transitionDuration')).to.eql('WebkitTransitionDuration');

		Prefixer.setUserAgent('MSIE 11.0');
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
		Prefixer.setUserAgent('Chrome/ 45.0');
		expect(Prefixer.process(input)).to.eql(output);

		let input2 = {
			appearance: 'test',
			transition: 'test'
		};
		Prefixer.setUserAgent('Chrome/ 49.0');
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
		Prefixer.setUserAgent('MSIE 10.0');
		expect(Prefixer.process(input)).to.eql(output);
	});



	it('should resolve alternatives', () => {
		let input = {
			display: 'flex'
		};

		let output = {
			display: '-webkit-flex;display:flex'
		}

		Prefixer.setUserAgent('Chrome/ 14.0');
		expect(Prefixer.process(input)).to.eql(output);
	});

	it('should resolve values', () => {
		let input = {
			justifyContent: 'space-between'
		};

		let output = {
			justifyContent: 'justify;justify-content:space-between'
		}
		Prefixer.setUserAgent('MSIE 10.0');
		let prefixed = Prefixer.process(input);
		expect(prefixed.justifyContent).to.equal('justify;justify-content:space-between');
		expect(prefixed).to.have.property('msFlexPack');
	});
});