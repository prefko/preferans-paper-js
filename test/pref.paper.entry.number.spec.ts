'use strict';

import PrefPaperEntryNumber from '../src/pref.paper.entry.number';

describe('PrefPaperEntryNumber tests', () => {
	describe('PrefPaperEntryNumber classes constructors tests', () => {
		it('constructors should work', () => {
			expect(() => new PrefPaperEntryNumber(3)).toThrow();
			expect(() => new PrefPaperEntryNumber(2)).not.toThrow();
			expect(new PrefPaperEntryNumber(60)).toBeInstanceOf(Object);
		});
	});

	describe('PrefPaperEntryNumber methods tests', () => {
		const eNumber = new PrefPaperEntryNumber(60);
		it('PrefPaperEntryNumber methods should return proper values', () => {
			expect(eNumber.isNumber).toBe(true);
			expect(eNumber.isRefa).toBe(false);
			expect(eNumber.isHat).toBe(false);
			expect(eNumber.repealed).toBe(false);
			expect(eNumber.value).toBe(60);
			expect(eNumber.json).toBe(60);
		});
	});

	describe('PrefPaperEntryNumber repealed tests', () => {
		const eNumberRepealed = new PrefPaperEntryNumber(60);
		eNumberRepealed.repealed = true;
		it('PrefPaperEntryNumber repealed methods should return proper values', () => {
			expect(eNumberRepealed.isNumber).toBe(true);
			expect(eNumberRepealed.isRefa).toBe(false);
			expect(eNumberRepealed.isHat).toBe(false);
			expect(eNumberRepealed.repealed).toBe(true);
			expect(eNumberRepealed.value).toBe(60);
			expect(eNumberRepealed.json).toEqual({value: 60, repealed: true});
		});
	});
});
