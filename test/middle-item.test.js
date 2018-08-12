const expect = require("chai").expect;

const PrefPaperMiddleItem = require("../lib/middle-item");

describe("PrefPaperMiddleItem tests", function () {
	it("PrefPaperMiddleItem should exist", function () {
		expect(PrefPaperMiddleItem).to.exist;
	});

	describe("PrefPaperMiddleItem constructor tests", function () {
		it("contructor should create object", function () {
			expect(() => new PrefPaperMiddleItem()).to.throw();
			expect(() => new PrefPaperMiddleItem(15)).to.throw();
			expect(() => new PrefPaperMiddleItem(-20)).to.throw();
			expect(() => new PrefPaperMiddleItem(20.20)).to.throw();
			expect(() => new PrefPaperMiddleItem(60)).to.not.throw();
			expect(() => new PrefPaperMiddleItem(60, false)).to.not.throw();
			expect(() => new PrefPaperMiddleItem(60, true)).to.not.throw();
			expect(() => new PrefPaperMiddleItem(true)).to.not.throw();
			expect(new PrefPaperMiddleItem(80)).to.be.an("object");
			expect(new PrefPaperMiddleItem(true)).to.be.an("object");
			expect(new PrefPaperMiddleItem(80, false)).to.be.an("object");
			expect(new PrefPaperMiddleItem(80, true)).to.be.an("object");
		});
	});

	describe("PrefPaperMiddleItem isInvalidated tests", function () {
		it("isInvalidated should return proper value", function () {
			expect(new PrefPaperMiddleItem(80).isInvalidated()).to.be.false;
			expect(new PrefPaperMiddleItem(true).isInvalidated()).to.be.false;
			expect(new PrefPaperMiddleItem(80, false).isInvalidated()).to.be.false;
			expect(new PrefPaperMiddleItem(80, true).isInvalidated()).to.be.true;
		});
	});

	describe("PrefPaperMiddleItem isRefa tests", function () {
		it("isRefa should return proper value", function () {
			expect(new PrefPaperMiddleItem(80).isRefa()).to.be.false;
			expect(new PrefPaperMiddleItem(true).isRefa()).to.be.true;
			expect(new PrefPaperMiddleItem(80, false).isRefa()).to.be.false;
			expect(new PrefPaperMiddleItem(80, true).isRefa()).to.be.false;
		});
	});

	describe("PrefPaperMiddleItem isValue tests", function () {
		it("isValue should return proper value", function () {
			expect(new PrefPaperMiddleItem(80).isValue()).to.be.true;
			expect(new PrefPaperMiddleItem(true).isValue()).to.be.false;
			expect(new PrefPaperMiddleItem(80, false).isValue()).to.be.true;
			expect(new PrefPaperMiddleItem(80, true).isValue()).to.be.true;
		});
	});

	describe("PrefPaperMiddleItem isRefaAvailable tests", function () {
		it("isRefaAvailable should return proper value", function () {
			expect(() => new PrefPaperMiddleItem(80).isRefaAvailable()).to.throw();
			expect(() => new PrefPaperMiddleItem(80, false).isRefaAvailable()).to.throw();
			expect(() => new PrefPaperMiddleItem(80, true).isRefaAvailable()).to.throw();
			expect(() => new PrefPaperMiddleItem(true).isRefaAvailable()).to.throw();
			expect(() => new PrefPaperMiddleItem(true).isRefaAvailable("maybe")).to.throw();
			expect(() => new PrefPaperMiddleItem(true).isRefaAvailable("left")).to.not.throw();
			expect(() => new PrefPaperMiddleItem(true).isRefaAvailable("middle")).to.not.throw();
			expect(() => new PrefPaperMiddleItem(true).isRefaAvailable("right")).to.not.throw();
			expect(new PrefPaperMiddleItem(true).isRefaAvailable("left")).to.be.true;
			expect(new PrefPaperMiddleItem(true).isRefaAvailable("middle")).to.be.true;
			expect(new PrefPaperMiddleItem(true).isRefaAvailable("right")).to.be.true;
		});
	});

	describe("PrefPaperMiddleItem markPlayedRefa tests", function () {
		it("markPlayedRefa should return object", function () {
			expect(() => new PrefPaperMiddleItem(80).markPlayedRefa()).to.throw();
			expect(() => new PrefPaperMiddleItem(80, false).markPlayedRefa()).to.throw();
			expect(() => new PrefPaperMiddleItem(80, true).markPlayedRefa()).to.throw();
			expect(() => new PrefPaperMiddleItem(true).markPlayedRefa()).to.throw();
			expect(() => new PrefPaperMiddleItem(true).markPlayedRefa("maybe")).to.throw();
			expect(() => new PrefPaperMiddleItem(true).markPlayedRefa("left")).to.not.throw();
			expect(() => new PrefPaperMiddleItem(true).markPlayedRefa("middle")).to.not.throw();
			expect(() => new PrefPaperMiddleItem(true).markPlayedRefa("right")).to.not.throw();
			expect(new PrefPaperMiddleItem(true).markPlayedRefa("left")).to.be.an("object");
			expect(new PrefPaperMiddleItem(true).markPlayedRefa("middle")).to.be.an("object");
			expect(new PrefPaperMiddleItem(true).markPlayedRefa("right")).to.be.an("object");
		});
	});

	describe("PrefPaperMiddleItem markPlayedRefa && isRefaAvailable combined tests", function () {
		let item = new PrefPaperMiddleItem(true);
		item.markPlayedRefa("left");
		item.markPlayedRefa("middle", true);
		item.markPlayedRefa("right");
		it("markPlayedRefa should set refa properly", function () {
			expect(() => item.isRefaAvailable("maybe")).to.throw();
			expect(item.isRefaAvailable("left")).to.be.false;
			expect(item.isRefaAvailable("middle")).to.be.false;
			expect(item.isRefaAvailable("right")).to.be.false;
		});
		it("markPlayedRefa should set refa properly", function () {
			expect(() => item.markPlayedRefa("maybe")).to.throw();
			expect(() => item.markPlayedRefa("left")).to.throw();
			expect(() => item.markPlayedRefa("middle")).to.throw();
			expect(() => item.markPlayedRefa("right")).to.throw();
		});
	});

	describe("PrefPaperMiddleItem getValue tests", function () {
		it("getValue should proper value", function () {
			expect(new PrefPaperMiddleItem(80).getValue()).to.be.equal(80);
			expect(new PrefPaperMiddleItem(80, false).getValue()).to.be.equal(80);
			expect(new PrefPaperMiddleItem(80, true).getValue()).to.deep.equal({invalidated: true, value: 80});
			expect(new PrefPaperMiddleItem(true).getValue()).to.deep.equal({left: 0, middle: 0, right: 0});
			expect(new PrefPaperMiddleItem(true, true).getValue()).to.deep.equal({invalidated: true, refa: {left: 0, middle: 0, right: 0}});
		});

		let item1 = new PrefPaperMiddleItem(true);
		item1.markPlayedRefa("left");
		item1.markPlayedRefa("middle", true);
		it("getValue should show refa properly", function () {
			expect(item1.getValue()).to.deep.equal({left: 1, middle: -1, right: 0});
		});

		let item2 = new PrefPaperMiddleItem(true, true);
		item2.markPlayedRefa("middle");
		item2.markPlayedRefa("right", true);
		it("getValue should show invalidate refa properly", function () {
			expect(item2.getValue()).to.deep.equal({invalidated: true, refa: {left: 0, middle: 1, right: -1}});
		});
	});

});
