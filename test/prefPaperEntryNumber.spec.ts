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
			expect(PrefPaperEntry.isEven(rand + 1)).to.be.equal(false);
			expect(PrefPaperEntry.isEven(rand)).to.be.equal(true);
		});
	});

	describe("PrefPaperEntryNumber methods tests", () => {
		const eNumber = new PrefPaperEntryNumber(60);
		it("PrefPaperEntryNumber methods should return proper values", () => {
			expect(eNumber.number).to.be.equal(true);
			expect(eNumber.refa).to.be.equal(false);
			expect(eNumber.hat).to.be.equal(false);
			expect(eNumber.repealed).to.be.equal(false);
			expect(eNumber.value).to.be.equal(60);
			expect(eNumber.json).to.equal(60);

		});

		const eNumberRepealed = new PrefPaperEntryNumber(60, true);
		it("PrefPaperEntryNumber repealed methods should return proper values", () => {
			expect(eNumberRepealed.number).to.be.equal(true);
			expect(eNumberRepealed.refa).to.be.equal(false);
			expect(eNumberRepealed.hat).to.be.equal(false);
			expect(eNumberRepealed.repealed).to.be.equal(true);
			expect(eNumberRepealed.value).to.be.equal(60);
			expect(eNumberRepealed.json).to.deep.equal({value: 60, repealed: true});
		});
	});

	describe("PrefPaperEntryNumber repealed tests", () => {
		const eNumberRepealed = new PrefPaperEntryNumber(60);
		eNumberRepealed.repealed = true;
		it("PrefPaperEntryNumber repealed methods should return proper values", () => {
			expect(eNumberRepealed.number).to.be.equal(true);
			expect(eNumberRepealed.refa).to.be.equal(false);
			expect(eNumberRepealed.hat).to.be.equal(false);
			expect(eNumberRepealed.repealed).to.be.equal(true);
			expect(eNumberRepealed.value).to.be.equal(60);
			expect(eNumberRepealed.json).to.deep.equal({value: 60, repealed: true});
		});
	});

});
