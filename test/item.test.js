const expect = require("chai").expect;

const PrefPaperItem = require("../lib/item");

describe("PrefPaperItem tests", function () {
	it("PrefPaperItem should exist", function () {
		expect(PrefPaperItem).to.exist;
	});

	describe("PrefPaperItem constructor tests", function () {
		it("contructor should create object", function () {
			expect(() => new PrefPaperItem()).to.throw();
			expect(() => new PrefPaperItem(15)).to.throw();
			expect(() => new PrefPaperItem(-20)).to.throw();
			expect(() => new PrefPaperItem(20.20)).to.throw();
			expect(() => new PrefPaperItem(60)).to.not.throw();
			expect(() => new PrefPaperItem(60, false)).to.not.throw();
			expect(() => new PrefPaperItem(60, true)).to.not.throw();
			expect(new PrefPaperItem(80)).to.be.an("object");
			expect(new PrefPaperItem(80, false)).to.be.an("object");
			expect(new PrefPaperItem(80, true)).to.be.an("object");
		});
	});

	describe("PrefPaperItem isInvalidated tests", function () {
		it("isInvalidated should return proper value", function () {
			expect(new PrefPaperItem(80).isInvalidated()).to.be.false;
			expect(new PrefPaperItem(80, false).isInvalidated()).to.be.false;
			expect(new PrefPaperItem(80, true).isInvalidated()).to.be.true;
		});
	});

	describe("PrefPaperItem isRefa tests", function () {
		it("isRefa should always return false", function () {
			expect(new PrefPaperItem(80).isRefa()).to.be.false;
			expect(new PrefPaperItem(80, false).isRefa()).to.be.false;
			expect(new PrefPaperItem(80, true).isRefa()).to.be.false;
		});
	});

	describe("PrefPaperItem getValue tests", function () {
		it("getValue should proper value", function () {
			expect(new PrefPaperItem(80).getValue()).to.be.equal(80);
			expect(new PrefPaperItem(80, false).getValue()).to.be.equal(80);
			expect(new PrefPaperItem(80, true).getValue()).to.deep.equal({invalidated: true, value: 80});
		});
	});

});
