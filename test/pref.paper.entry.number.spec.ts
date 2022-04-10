'use strict';

import {expect} from 'chai';

import PrefPaperEntryNumber from '../src/pref.paper.entry.number';

describe('PrefPaperEntryNumber tests', () => {
	describe('PrefPaperEntryNumber classes constructors tests', () => {
		it('constructors should work', () => {
			expect(() => new PrefPaperEntryNumber(3)).to.throw();
			expect(() => new PrefPaperEntryNumber(2)).to.not.throw();
			expect(new PrefPaperEntryNumber(60)).to.be.an('object');
		});
	});

	describe('PrefPaperEntryNumber methods tests', () => {
		const eNumber = new PrefPaperEntryNumber(60);
		it('PrefPaperEntryNumber methods should return proper values', () => {
			expect(eNumber.isNumber).to.equal(true);
			expect(eNumber.isRefa).to.equal(false);
			expect(eNumber.isHat).to.equal(false);
			expect(eNumber.repealed).to.equal(false);
			expect(eNumber.value).to.equal(60);
			expect(eNumber.json).to.equal(60);
		});
	});

	describe('PrefPaperEntryNumber repealed tests', () => {
		const eNumberRepealed = new PrefPaperEntryNumber(60);
		eNumberRepealed.repealed = true;
		it('PrefPaperEntryNumber repealed methods should return proper values', () => {
			expect(eNumberRepealed.isNumber).to.equal(true);
			expect(eNumberRepealed.isRefa).to.equal(false);
			expect(eNumberRepealed.isHat).to.equal(false);
			expect(eNumberRepealed.repealed).to.equal(true);
			expect(eNumberRepealed.value).to.equal(60);
			expect(eNumberRepealed.json).to.deep.equal({value: 60, repealed: true});
		});
	});
});
