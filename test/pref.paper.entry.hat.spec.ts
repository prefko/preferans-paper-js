'use strict';

import {expect} from 'chai';

import PrefPaperEntryHat from '../src/pref.paper.entry.hat';

describe('PrefPaperEntryHat tests', () => {
	describe('PrefPaperEntryHat classes constructors tests', () => {
		it('constructors should work', () => {
			expect(() => new PrefPaperEntryHat()).to.not.throw();
			expect(new PrefPaperEntryHat()).to.be.an('object');
		});
	});

	describe('PrefPaperEntryHat methods tests', () => {
		const eHat = new PrefPaperEntryHat();
		it('PrefPaperEntryHat methods should return proper values', () => {
			expect(eHat.isNumber).to.equal(false);
			expect(eHat.isRefa).to.equal(false);
			expect(eHat.isHat).to.equal(true);
			expect(eHat.crossed).to.equal(false);
			expect(eHat.json).to.deep.equal({hat: 1});
		});

		const eHatCrossed = new PrefPaperEntryHat();
		eHatCrossed.crossed = true;
		it('PrefPaperEntryHat isCrossed methods should return proper values', () => {
			expect(eHatCrossed.isNumber).to.equal(false);
			expect(eHatCrossed.isRefa).to.equal(false);
			expect(eHatCrossed.isHat).to.equal(true);
			expect(eHatCrossed.isHat).to.equal(true);
			expect(eHatCrossed.json).to.deep.equal({hat: -1});
		});
	});
});
