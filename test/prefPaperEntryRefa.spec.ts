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
			expect(eRefa.number).to.be.equal(false);
			expect(eRefa.refa).to.be.equal(true);
			expect(eRefa.hat).to.be.equal(false);
			expect(eRefa.leftPlayed).to.be.equal(false);
			expect(eRefa.middlePlayed).to.be.equal(false);
			expect(eRefa.rightPlayed).to.be.equal(false);
			expect(eRefa.json).to.deep.equal({left: 0, middle: 0, right: 0});
		});
	});

	describe("PrefPaperEntryRefa setPlayed tests", () => {
		it("setPlayed should throw properly", () => {
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.LEFT, true)).to.not.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.LEFT, true).setPlayed(PrefPaperPosition.LEFT, true)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.LEFT, true).setPlayed(PrefPaperPosition.LEFT, false)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.LEFT, false).setPlayed(PrefPaperPosition.LEFT, true)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.LEFT, false).setPlayed(PrefPaperPosition.LEFT, false)).to.throw();

			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.MIDDLE, true)).to.not.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.MIDDLE, true).setPlayed(PrefPaperPosition.MIDDLE, true)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.MIDDLE, true).setPlayed(PrefPaperPosition.MIDDLE, false)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.MIDDLE, false).setPlayed(PrefPaperPosition.MIDDLE, true)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.MIDDLE, false).setPlayed(PrefPaperPosition.MIDDLE, false)).to.throw();

			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.RIGHT, true)).to.not.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.RIGHT, true).setPlayed(PrefPaperPosition.RIGHT, true)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.RIGHT, true).setPlayed(PrefPaperPosition.RIGHT, false)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.RIGHT, false).setPlayed(PrefPaperPosition.RIGHT, true)).to.throw();
			expect(() => new PrefPaperEntryRefa().setPlayed(PrefPaperPosition.RIGHT, false).setPlayed(PrefPaperPosition.RIGHT, false)).to.throw();
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
					r.setPlayed(PrefPaperPosition.LEFT, t > 0);
				} else if (2 === Math.abs(t)) {
					r.setPlayed(PrefPaperPosition.MIDDLE, t > 0);
				} else if (3 === Math.abs(t)) {
					r.setPlayed(PrefPaperPosition.RIGHT, t > 0);
				}
			});
			it("setPlayed should equal" + JSON.stringify(c.j), () => {
				expect(r.leftPlayed).to.be.equal(c.r[0]);
				expect(r.middlePlayed).to.be.equal(c.r[1]);
				expect(r.rightPlayed).to.be.equal(c.r[2]);
				expect(r.json).to.deep.equal(c.j);
			});
		});

	});

});
