#!/usr/bin/env node
"use strict";

import {expect} from 'chai';
import PrefPaperEntryHat from "../src/prefPaperEntryHat";

describe("PrefPaperEntryHat tests", () => {

	describe("PrefPaperEntryHat classes constructors tests", () => {
		it("constructors should work", () => {
			expect(() => new PrefPaperEntryHat()).to.not.throw();
			expect(() => new PrefPaperEntryHat(true)).to.not.throw();
			expect(new PrefPaperEntryHat()).to.be.an("object");
		});
	});

	describe("PrefPaperEntryHat methods tests", () => {
		const eHat = new PrefPaperEntryHat();
		it("PrefPaperEntryHat methods should return proper values", () => {
			expect(eHat.number).to.be.equal(false);
			expect(eHat.refa).to.be.equal(false);
			expect(eHat.hat).to.be.equal(true);
			expect(eHat.crossed).to.be.equal(false);
			expect(eHat.json).to.deep.equal({hat: 1});
		});

		const eHatCrossed = new PrefPaperEntryHat(true);
		it("PrefPaperEntryHat crossed methods should return proper values", () => {
			expect(eHatCrossed.number).to.be.equal(false);
			expect(eHatCrossed.refa).to.be.equal(false);
			expect(eHatCrossed.hat).to.be.equal(true);
			expect(eHatCrossed.hat).to.be.equal(true);
			expect(eHatCrossed.json).to.deep.equal({hat: -1});
		});
	});

});
