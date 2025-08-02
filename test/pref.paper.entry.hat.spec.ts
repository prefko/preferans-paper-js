'use strict';

import PrefPaperEntryHat from '../src/pref.paper.entry.hat';

describe('PrefPaperEntryHat tests', () => {
	describe('PrefPaperEntryHat classes constructors tests', () => {
		it('constructors should work', () => {
			expect(() => new PrefPaperEntryHat()).not.toThrow();
			expect(new PrefPaperEntryHat()).toBeInstanceOf(Object);
		});
	});

	describe('PrefPaperEntryHat methods tests', () => {
		const eHat = new PrefPaperEntryHat();
		it('PrefPaperEntryHat methods should return proper values', () => {
			expect(eHat.isNumber).toBe(false);
			expect(eHat.isRefa).toBe(false);
			expect(eHat.isHat).toBe(true);
			expect(eHat.crossed).toBe(false);
			expect(eHat.json).toEqual({hat: 1});
		});

		const eHatCrossed = new PrefPaperEntryHat();
		eHatCrossed.crossed = true;
		it('PrefPaperEntryHat isCrossed methods should return proper values', () => {
			expect(eHatCrossed.isNumber).toBe(false);
			expect(eHatCrossed.isRefa).toBe(false);
			expect(eHatCrossed.isHat).toBe(true);
			expect(eHatCrossed.isHat).toBe(true);
			expect(eHatCrossed.json).toEqual({hat: -1});
		});
	});
});
