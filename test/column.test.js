const expect = require("chai").expect;

const PrefPaperColumn = require("../lib/column");
let sredina = new PrefPaperColumn(30, true)
	.addValue(-10).addRefa()
	.addValue(-26).addValue(10, true).addValue(18).addRefa()
	.markPlayedRefa("left").markPlayedRefa("middle", true);

let supa = new PrefPaperColumn().addValue(10).addValue(40).addValue(50);

describe("PrefPaperColumn tests", function () {
	it("PrefPaperColumn should exist", function () {
		expect(PrefPaperColumn).to.exist;
	});

	describe("PrefPaperColumn constructor tests", function () {
		it("contructor should create object", function () {
			expect(() => new PrefPaperColumn()).to.not.throw();
			expect(() => new PrefPaperColumn(15)).to.throw();
			expect(() => new PrefPaperColumn(-20)).to.throw();
			expect(() => new PrefPaperColumn(20.20)).to.throw();
			expect(() => new PrefPaperColumn(60)).to.throw();
			expect(() => new PrefPaperColumn(60, false)).to.throw();
			expect(() => new PrefPaperColumn(60, true)).to.not.throw();
			expect(new PrefPaperColumn()).to.be.an("object");
			expect(new PrefPaperColumn(80, true)).to.be.an("object");
		});
	});

	describe("PrefPaperColumn reset tests", function () {
		let column1 = new PrefPaperColumn().addValue(10).addValue(50).reset();
		it("reset should return soup to initial values", function () {
			expect(column1.getValue()).to.be.equal(0);
			expect(column1.getJSON()).to.deep.equal([]);
		});
		let column2 = new PrefPaperColumn(30, true).addValue(-10).addRefa().addValue(-26).reset();
		it("reset should return middle to initial values", function () {
			expect(column2.getValue()).to.be.equal(30);
			expect(column2.getJSON()).to.deep.equal([30]);
		});
	});

	describe("PrefPaperColumn addValue tests", function () {
		let column1 = new PrefPaperColumn();
		let column2 = new PrefPaperColumn(30, true);
		it("addValue should throw properly", function () {
			expect(() => column1.addValue(9)).to.throw();
			expect(() => column1.addValue(-10)).to.throw();
			expect(() => column1.addValue(10)).to.not.throw();
			expect(() => column2.addValue(9)).to.throw();
			expect(() => column2.addValue(-10)).to.not.throw();
			expect(() => column2.addValue(10)).to.not.throw();
		});
	});

	describe("PrefPaperColumn addRefa tests", function () {
		it("addRefa should throw properly", function () {
			expect(() => new PrefPaperColumn().addRefa()).to.throw();
			expect(() => new PrefPaperColumn(30, true).addRefa()).to.not.throw();
		});
	});

	describe("PrefPaperColumn getUnplayedRefasCount tests", function () {
		it("getUnplayedRefasCount should return correct values", function () {
			expect(new PrefPaperColumn(80, true).getUnplayedRefasCount()).to.be.equal(0);
			expect(sredina.getUnplayedRefasCount()).to.be.equal(1);
		});
	});

	describe("PrefPaperColumn markPlayedRefa tests", function () {
		it("markPlayedRefa should throw properly", function () {
			expect(() => new PrefPaperColumn().markPlayedRefa()).to.throw();
			expect(() => new PrefPaperColumn(30, true).addRefa().markPlayedRefa("maybe")).to.throw();
			expect(() => new PrefPaperColumn(30, true).markPlayedRefa("left")).to.throw();
			expect(() => new PrefPaperColumn(30, true).addRefa().markPlayedRefa("left").markPlayedRefa("left")).to.throw();
			expect(() => new PrefPaperColumn(30, true).addRefa().markPlayedRefa("left")).to.not.throw();
			expect(() => new PrefPaperColumn(30, true).addRefa().markPlayedRefa("middle")).to.not.throw();
			expect(() => new PrefPaperColumn(30, true).addRefa().markPlayedRefa("right")).to.not.throw();
		});
	});

	describe("PrefPaperColumn getValue tests", function () {
		it("getValue should return correct values", function () {
			expect(new PrefPaperColumn().getValue()).to.be.equal(0);
			expect(new PrefPaperColumn(80, true).getValue()).to.be.equal(80);
			expect(supa.getValue()).to.be.equal(100);
			expect(sredina.getValue()).to.be.equal(12);
		});
	});

	describe("PrefPaperColumn getJSON tests", function () {
		it("getJSON should return correct values", function () {
			expect(new PrefPaperColumn().getJSON()).to.deep.equal([]);
			expect(new PrefPaperColumn(80, true).getJSON()).to.deep.equal([80]);
			expect(supa.getJSON()).to.deep.equal([10, 50, 100]);
			expect(sredina.getJSON()).to.deep.equal([
				30,
				20,
				{left: 1, middle: -1, right: 0},
				{hat: 1},
				-6,
				{invalidated: true, value: 4},
				{hat: -1},
				12,
				{left: 0, middle: 0, right: 0}
			]);
		});
	});

});
