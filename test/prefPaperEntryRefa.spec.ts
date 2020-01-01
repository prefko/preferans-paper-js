#!/usr/bin/env node
"use strict";

import {each} from 'lodash';
import {expect} from 'chai';
import PrefPaperEntryRefa from "../src/prefPaperEntryRefa";
import {PrefPaperPosition} from "../src/prefPaperEnums";

describe("PrefPaperEntryRefa tests", () => {

	describe("PrefPaperEntryRefa classes constructors tests", () => {
		it("constructors should work", () => {
			expect(() => new PrefPaperEntryRefa()).to.not.throw();
			expect(new PrefPaperEntryRefa()).to.be.an("object");
		});
	});

	describe("PrefPaperEntryRefa methods tests", () => {
		const eRefa = new PrefPaperEntryRefa();
		it("PrefPaperEntryRefa methods should return proper values", () => {
			expect(eRefa.isNumber).to.equal(false);
			expect(eRefa.isRefa).to.equal(true);
			expect(eRefa.isHat).to.equal(false);
			expect(eRefa.leftPlayed).to.equal(false);
			expect(eRefa.middlePlayed).to.equal(false);
			expect(eRefa.rightPlayed).to.equal(false);
			expect(eRefa.json).to.deep.equal({left: 0, middle: 0, right: 0});
		});
	});

	describe("PrefPaperEntryRefa setPlayed tests", () => {
		it("setPlayed should throw properly", () => {
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.LEFT)).to.not.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.LEFT).setPlayedPassed(PrefPaperPosition.LEFT)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.LEFT).setPlayedFailed(PrefPaperPosition.LEFT)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.LEFT).setPlayedPassed(PrefPaperPosition.LEFT)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.LEFT).setPlayedFailed(PrefPaperPosition.LEFT)).to.throw();

			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.MIDDLE)).to.not.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.MIDDLE).setPlayedPassed(PrefPaperPosition.MIDDLE)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.MIDDLE).setPlayedFailed(PrefPaperPosition.MIDDLE)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.MIDDLE).setPlayedPassed(PrefPaperPosition.MIDDLE)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.MIDDLE).setPlayedFailed(PrefPaperPosition.MIDDLE)).to.throw();

			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.RIGHT)).to.not.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.RIGHT).setPlayedPassed(PrefPaperPosition.RIGHT)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedPassed(PrefPaperPosition.RIGHT).setPlayedFailed(PrefPaperPosition.RIGHT)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.RIGHT).setPlayedPassed(PrefPaperPosition.RIGHT)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayedFailed(PrefPaperPosition.RIGHT).setPlayedFailed(PrefPaperPosition.RIGHT)).to.throw();
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
			it("setPlayed should equal" + JSON.stringify(c.j), () => {
				expect(r.leftPlayed).to.equal(c.r[0]);
				expect(r.middlePlayed).to.equal(c.r[1]);
				expect(r.rightPlayed).to.equal(c.r[2]);
				expect(r.json).to.deep.equal(c.j);
			});
		});

	});

});
