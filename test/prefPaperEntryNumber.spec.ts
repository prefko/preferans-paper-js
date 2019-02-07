#!/usr/bin/env node
"use strict";

import {expect} from 'chai';
import PrefPaperEntryNumber from "../src/prefPaperEntryNumber";
import PrefPaperEntry from "../src/prefPaperEntry";

describe("PrefPaperEntryNumber tests", () => {

	describe("PrefPaperEntryNumber classes constructors tests", () => {
		it("constructors should work", () => {
			expect(() => new PrefPaperEntryNumber(3)).to.throw();
			expect(() => new PrefPaperEntryNumber(3, true)).to.throw();
			expect(() => new PrefPaperEntryNumber(2)).to.not.throw();
			expect(() => new PrefPaperEntryNumber(2, true)).to.not.throw();
			expect(new PrefPaperEntryNumber(60)).to.be.an("object");
		});
	});

	describe("PrefPaperEntryNumber isEven tests", () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it("isEven should work", () => {
			expect(PrefPaperEntry.isEven(rand + 1)).to.equal(false);
			expect(PrefPaperEntry.isEven(rand)).to.equal(true);
		});
	});

	describe("PrefPaperEntryNumber methods tests", () => {
		const eNumber = new PrefPaperEntryNumber(60);
		it("PrefPaperEntryNumber methods should return proper values", () => {
			expect(eNumber.isNumber).to.equal(true);
			expect(eNumber.isRefa).to.equal(false);
			expect(eNumber.isHat).to.equal(false);
			expect(eNumber.repealed).to.equal(false);
			expect(eNumber.value).to.equal(60);
			expect(eNumber.json).to.equal(60);

		});

		const eNumberRepealed = new PrefPaperEntryNumber(60, true);
		it("PrefPaperEntryNumber repealed methods should return proper values", () => {
			expect(eNumberRepealed.isNumber).to.equal(true);
			expect(eNumberRepealed.isRefa).to.equal(false);
			expect(eNumberRepealed.isHat).to.equal(false);
			expect(eNumberRepealed.repealed).to.equal(true);
			expect(eNumberRepealed.value).to.equal(60);
			expect(eNumberRepealed.json).to.deep.equal({value: 60, repealed: true});
		});
	});

	describe("PrefPaperEntryNumber repealed tests", () => {
		const eNumberRepealed = new PrefPaperEntryNumber(60);
		eNumberRepealed.repealed = true;
		it("PrefPaperEntryNumber repealed methods should return proper values", () => {
			expect(eNumberRepealed.isNumber).to.equal(true);
			expect(eNumberRepealed.isRefa).to.equal(false);
			expect(eNumberRepealed.isHat).to.equal(false);
			expect(eNumberRepealed.repealed).to.equal(true);
			expect(eNumberRepealed.value).to.equal(60);
			expect(eNumberRepealed.json).to.deep.equal({value: 60, repealed: true});
		});
	});

});
