'use strict';

import PrefPaperColumnMiddle from '../src/pref.paper.column.middle';
import PrefPaperPosition from '../src/enums/pref.paper.position';

describe('PrefPaperColumnMiddle tests', () => {
	describe('PrefPaperColumnMiddle classes constructors tests', () => {
		const rand = Math.ceil(Math.random() * 1000) * 2;
		it('constructors should work', () => {
			expect(() => new PrefPaperColumnMiddle(rand + 1)).toThrow();
			expect(() => new PrefPaperColumnMiddle(rand)).not.toThrow();
			expect(new PrefPaperColumnMiddle(60)).toBeInstanceOf(Object);
		});
	});

	describe('PrefPaperColumnMiddle method tests', () => {
		const column1 = new PrefPaperColumnMiddle(60);
		it('PrefPaperColumnMiddle methods should work properly', () => {
			expect(column1.value).toBe(60);
			expect(column1.json).toEqual([60]);
			expect(column1.hasOpenRefa()).toBe(false);
		});
	});

	describe('PrefPaperColumnMiddle addValue tests', () => {
		const rand = Math.ceil(Math.random() * 1000) * 2;
		it('PrefPaperColumnMiddle addValue should throw', () => {
			expect(() => new PrefPaperColumnMiddle(60).addValue(rand + 1)).toThrow();
		});

		const column2 = new PrefPaperColumnMiddle(60).addValue(10).addValue(-10);
		it('PrefPaperColumnMiddle addValue should work properly', () => {
			expect(column2.value).toBe(60);
			expect(column2.json).toEqual([60, 70, 60]);
		});

		const column3 = new PrefPaperColumnMiddle(60).addValue(10).addValueRepealed(-10);
		it('PrefPaperColumnMiddle addValue repealed should work properly', () => {
			expect(column3.value).toBe(70);
			expect(column3.json).toEqual([60, 70, {value: 60, repealed: true}]);
		});

		const column4 = new PrefPaperColumnMiddle(30).addValue(-30);
		it('PrefPaperColumnMiddle addValue to 0 should work properly', () => {
			expect(column4.value).toBe(0);
			expect(column4.json).toEqual([30, {hat: 1}]);
		});

		const column5 = new PrefPaperColumnMiddle(30).addValue(-40);
		it('PrefPaperColumnMiddle addValue below 0 should work properly', () => {
			expect(column5.value).toBe(-10);
			expect(column5.json).toEqual([30, {hat: 1}, -10]);
		});

		const column6 = new PrefPaperColumnMiddle(30).addValue(-40).addValue(10);
		it('PrefPaperColumnMiddle addValue below 0 back to 0 should work properly', () => {
			expect(column6.value).toBe(0);
			expect(column6.json).toEqual([30, {hat: 1}, -10, {hat: -1}]);
		});

		const column7 = new PrefPaperColumnMiddle(30).addValue(-40).addValue(20);
		it('PrefPaperColumnMiddle addValue below 0 back to 0 should work properly', () => {
			expect(column7.value).toBe(10);
			expect(column7.json).toEqual([30, {hat: 1}, -10, {hat: -1}, 10]);
		});
	});

	describe('PrefPaperColumnMiddle addRefa tests', () => {
		const column8 = new PrefPaperColumnMiddle(60).addRefa();
		it('PrefPaperColumnMiddle addRefa should work properly', () => {
			expect(column8.value).toBe(60);
			expect(column8.json).toEqual([60, {left: 0, middle: 0, right: 0}]);
			expect(column8.hasOpenRefa()).toBe(true);
		});
	});

	describe('PrefPaperColumnMiddle markPlayedRefa tests', () => {
		const column9 = new PrefPaperColumnMiddle(60).addValue(10).addValue(10).addRefa().addValue(10).markPlayedRefaPassed(PrefPaperPosition.LEFT);
		const column10 = new PrefPaperColumnMiddle(60).addValue(10).addRefa().addValue(10).markPlayedRefaFailed(PrefPaperPosition.MIDDLE);
		const column11 = new PrefPaperColumnMiddle(60).addValue(10).addValue(10).addValue(10).addRefa().addValue(10).markPlayedRefaFailed(PrefPaperPosition.RIGHT);
		it('PrefPaperColumnMiddle markPlayedRefa should work properly', () => {
			expect(() => column9.markPlayedRefaPassed(PrefPaperPosition.LEFT)).toThrow();
			expect(() => column9.markPlayedRefaFailed(PrefPaperPosition.LEFT)).toThrow();

			expect(column9.value).toBe(90);
			expect(column9.json).toEqual([60, 70, 80, {left: 1, middle: 0, right: 0}, 90]);
			expect(column9.hasOpenRefa()).toBe(true);

			expect(column10.value).toBe(80);
			expect(column10.json).toEqual([60, 70, {left: 0, middle: -1, right: 0}, 80]);
			expect(column10.hasOpenRefa()).toBe(false);

			expect(column11.value).toBe(100);
			expect(column11.json).toEqual([60, 70, 80, 90, {left: 0, middle: 0, right: -1}, 100]);
			expect(column11.hasOpenRefa()).toBe(true);
		});
	});

	describe('PrefPaperColumnMiddle reset tests', () => {
		const column12 = new PrefPaperColumnMiddle(60).addRefa().reset();
		it('PrefPaperColumnMiddle reset should work properly', () => {
			expect(column12.value).toBe(60);
			expect(column12.json).toEqual([60]);
		});
	});
});
