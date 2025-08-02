'use strict';

import {each} from 'lodash';
import PrefPaperEntryRefa from '../src/pref.paper.entry.refa';
import PrefPaperPosition from '../src/enums/pref.paper.position';

describe('PrefPaperEntryRefa tests', () => {
	describe('PrefPaperEntryRefa classes constructors tests', () => {
		it('constructors should work', () => {
			expect(() => new PrefPaperEntryRefa()).not.toThrow();
			expect(new PrefPaperEntryRefa()).toBeInstanceOf(Object);
		});
	});

	describe('PrefPaperEntryRefa methods tests', () => {
		const eRefa = new PrefPaperEntryRefa();
		it('PrefPaperEntryRefa methods should return proper values', () => {
			expect(eRefa.isNumber).toBe(false);
			expect(eRefa.isRefa).toBe(true);
			expect(eRefa.isHat).toBe(false);
			expect(eRefa.leftPlayed).toBe(false);
			expect(eRefa.middlePlayed).toBe(false);
			expect(eRefa.rightPlayed).toBe(false);
			expect(eRefa.json).toEqual({left: 0, middle: 0, right: 0});
		});
	});

	describe('PrefPaperEntryRefa setPlayed tests', () => {
		it('setPlayed should throw properly', () => {
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.LEFT)).not.toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.LEFT).setPlayedPassed(PrefPaperPosition.LEFT)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.LEFT).setPlayedFailed(PrefPaperPosition.LEFT)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.LEFT).setPlayedPassed(PrefPaperPosition.LEFT)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.LEFT).setPlayedFailed(PrefPaperPosition.LEFT)).toThrow();

			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.MIDDLE)).not.toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.MIDDLE).setPlayedPassed(PrefPaperPosition.MIDDLE)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.MIDDLE).setPlayedFailed(PrefPaperPosition.MIDDLE)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.MIDDLE).setPlayedPassed(PrefPaperPosition.MIDDLE)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.MIDDLE).setPlayedFailed(PrefPaperPosition.MIDDLE)).toThrow();

			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.RIGHT)).not.toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.RIGHT).setPlayedPassed(PrefPaperPosition.RIGHT)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.RIGHT).setPlayedFailed(PrefPaperPosition.RIGHT)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.RIGHT).setPlayedPassed(PrefPaperPosition.RIGHT)).toThrow();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.RIGHT).setPlayedFailed(PrefPaperPosition.RIGHT)).toThrow();
		});

		const combos = [
			{t: [], r: [false, false, false], j: {left: 0, middle: 0, right: 0}},
			{t: [1], r: [true, false, false], j: {left: 1, middle: 0, right: 0}},
			{t: [-1], r: [true, false, false], j: {left: -1, middle: 0, right: 0}},
			{t: [2], r: [false, true, false], j: {left: 0, middle: 1, right: 0}},
			{t: [-2], r: [false, true, false], j: {left: 0, middle: -1, right: 0}},
			{t: [3], r: [false, false, true], j: {left: 0, middle: 0, right: 1}},
			{t: [-3], r: [false, false, true], j: {left: 0, middle: 0, right: -1}},

			{t: [1, 2], r: [true, true, false], j: {left: 1, middle: 1, right: 0}},
			{t: [1, -2], r: [true, true, false], j: {left: 1, middle: -1, right: 0}},
			{t: [-1, 2], r: [true, true, false], j: {left: -1, middle: 1, right: 0}},
			{t: [-1, -2], r: [true, true, false], j: {left: -1, middle: -1, right: 0}},
			{t: [2, 1], r: [true, true, false], j: {left: 1, middle: 1, right: 0}},
			{t: [-2, 1], r: [true, true, false], j: {left: 1, middle: -1, right: 0}},
			{t: [2, -1], r: [true, true, false], j: {left: -1, middle: 1, right: 0}},
			{t: [-2, -1], r: [true, true, false], j: {left: -1, middle: -1, right: 0}},

			{t: [1, 3], r: [true, false, true], j: {left: 1, middle: 0, right: 1}},
			{t: [1, -3], r: [true, false, true], j: {left: 1, middle: 0, right: -1}},
			{t: [-1, 3], r: [true, false, true], j: {left: -1, middle: 0, right: 1}},
			{t: [-1, -3], r: [true, false, true], j: {left: -1, middle: 0, right: -1}},
			{t: [3, 1], r: [true, false, true], j: {left: 1, middle: 0, right: 1}},
			{t: [-3, 1], r: [true, false, true], j: {left: 1, middle: 0, right: -1}},
			{t: [3, -1], r: [true, false, true], j: {left: -1, middle: 0, right: 1}},
			{t: [-3, -1], r: [true, false, true], j: {left: -1, middle: 0, right: -1}},

			{t: [2, 3], r: [false, true, true], j: {left: 0, middle: 1, right: 1}},
			{t: [-2, 3], r: [false, true, true], j: {left: 0, middle: -1, right: 1}},
			{t: [2, -3], r: [false, true, true], j: {left: 0, middle: 1, right: -1}},
			{t: [-2, -3], r: [false, true, true], j: {left: 0, middle: -1, right: -1}},
			{t: [3, 2], r: [false, true, true], j: {left: 0, middle: 1, right: 1}},
			{t: [3, -2], r: [false, true, true], j: {left: 0, middle: -1, right: 1}},
			{t: [-3, 2], r: [false, true, true], j: {left: 0, middle: 1, right: -1}},
			{t: [-3, -2], r: [false, true, true], j: {left: 0, middle: -1, right: -1}},

			{t: [1, 2, 3], r: [true, true, true], j: {left: 1, middle: 1, right: 1}},
			{t: [1, 2, -3], r: [true, true, true], j: {left: 1, middle: 1, right: -1}},
			{t: [1, -2, 3], r: [true, true, true], j: {left: 1, middle: -1, right: 1}},
			{t: [1, -2, -3], r: [true, true, true], j: {left: 1, middle: -1, right: -1}},
			{t: [-1, 2, 3], r: [true, true, true], j: {left: -1, middle: 1, right: 1}},
			{t: [-1, 2, -3], r: [true, true, true], j: {left: -1, middle: 1, right: -1}},
			{t: [-1, -2, 3], r: [true, true, true], j: {left: -1, middle: -1, right: 1}},
			{t: [-1, -2, -3], r: [true, true, true], j: {left: -1, middle: -1, right: -1}},

			{t: [1, 3, 2], r: [true, true, true], j: {left: 1, middle: 1, right: 1}},
			{t: [1, 3, -2], r: [true, true, true], j: {left: 1, middle: -1, right: 1}},
			{t: [1, -3, 2], r: [true, true, true], j: {left: 1, middle: 1, right: -1}},
			{t: [1, -3, -2], r: [true, true, true], j: {left: 1, middle: -1, right: -1}},
			{t: [-1, 3, 2], r: [true, true, true], j: {left: -1, middle: 1, right: 1}},
			{t: [-1, 3, -2], r: [true, true, true], j: {left: -1, middle: -1, right: 1}},
			{t: [-1, -3, 2], r: [true, true, true], j: {left: -1, middle: 1, right: -1}},
			{t: [-1, -3, -2], r: [true, true, true], j: {left: -1, middle: -1, right: -1}},

			{t: [2, 1, 3], r: [true, true, true], j: {left: 1, middle: 1, right: 1}},
			{t: [2, 1, -3], r: [true, true, true], j: {left: 1, middle: 1, right: -1}},
			{t: [2, -1, 3], r: [true, true, true], j: {left: -1, middle: 1, right: 1}},
			{t: [2, -1, -3], r: [true, true, true], j: {left: -1, middle: 1, right: -1}},
			{t: [-2, 1, 3], r: [true, true, true], j: {left: 1, middle: -1, right: 1}},
			{t: [-2, 1, -3], r: [true, true, true], j: {left: 1, middle: -1, right: -1}},
			{t: [-2, -1, 3], r: [true, true, true], j: {left: -1, middle: -1, right: 1}},
			{t: [-2, -1, -3], r: [true, true, true], j: {left: -1, middle: -1, right: -1}},

			{t: [2, 3, 1], r: [true, true, true], j: {left: 1, middle: 1, right: 1}},
			{t: [2, 3, -1], r: [true, true, true], j: {left: -1, middle: 1, right: 1}},
			{t: [2, -3, 1], r: [true, true, true], j: {left: 1, middle: 1, right: -1}},
			{t: [2, -3, -1], r: [true, true, true], j: {left: -1, middle: 1, right: -1}},
			{t: [-2, 3, 1], r: [true, true, true], j: {left: 1, middle: -1, right: 1}},
			{t: [-2, 3, -1], r: [true, true, true], j: {left: -1, middle: -1, right: 1}},
			{t: [-2, -3, 1], r: [true, true, true], j: {left: 1, middle: -1, right: -1}},
			{t: [-2, -3, -1], r: [true, true, true], j: {left: -1, middle: -1, right: -1}},

			{t: [3, 1, 2], r: [true, true, true], j: {left: 1, middle: 1, right: 1}},
			{t: [3, 1, -2], r: [true, true, true], j: {left: 1, middle: -1, right: 1}},
			{t: [3, -1, 2], r: [true, true, true], j: {left: -1, middle: 1, right: 1}},
			{t: [3, -1, -2], r: [true, true, true], j: {left: -1, middle: -1, right: 1}},
			{t: [-3, 1, 2], r: [true, true, true], j: {left: 1, middle: 1, right: -1}},
			{t: [-3, 1, -2], r: [true, true, true], j: {left: 1, middle: -1, right: -1}},
			{t: [-3, -1, 2], r: [true, true, true], j: {left: -1, middle: 1, right: -1}},
			{t: [-3, -1, -2], r: [true, true, true], j: {left: -1, middle: -1, right: -1}},

			{t: [3, 2, 1], r: [true, true, true], j: {left: 1, middle: 1, right: 1}},
			{t: [3, 2, -1], r: [true, true, true], j: {left: -1, middle: 1, right: 1}},
			{t: [3, -2, 1], r: [true, true, true], j: {left: 1, middle: -1, right: 1}},
			{t: [3, -2, -1], r: [true, true, true], j: {left: -1, middle: -1, right: 1}},
			{t: [-3, 2, 1], r: [true, true, true], j: {left: 1, middle: 1, right: -1}},
			{t: [-3, 2, -1], r: [true, true, true], j: {left: -1, middle: 1, right: -1}},
			{t: [-3, -2, 1], r: [true, true, true], j: {left: 1, middle: -1, right: -1}},
			{t: [-3, -2, -1], r: [true, true, true], j: {left: -1, middle: -1, right: -1}}
		];

		each(combos, (c) => {
			const r = new PrefPaperEntryRefa();
			each(c.t, (t) => {
				if (1 === Math.abs(t)) {
					if (t > 0) r.setPlayedPassed(PrefPaperPosition.LEFT);
					else r.setPlayedFailed(PrefPaperPosition.LEFT);
				} else if (2 === Math.abs(t)) {
					if (t > 0) r.setPlayedPassed(PrefPaperPosition.MIDDLE);
					else r.setPlayedFailed(PrefPaperPosition.MIDDLE);
				} else if (3 === Math.abs(t)) {
					if (t > 0) r.setPlayedPassed(PrefPaperPosition.RIGHT);
					else r.setPlayedFailed(PrefPaperPosition.RIGHT);
				}
			});
			it('setPlayed should equal' + JSON.stringify(c.j), () => {
				expect(r.leftPlayed).toBe(c.r[0]);
				expect(r.middlePlayed).toBe(c.r[1]);
				expect(r.rightPlayed).toBe(c.r[2]);
				expect(r.json).toEqual(c.j);
			});
		});
	});
});
