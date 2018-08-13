const expect = require("chai").expect;

const PrefPaperPlayer = require("../lib/player");
let player = new PrefPaperPlayer("cope", 30);
player.addLeftValue(10).addLeftValue(50).addRightValue(100);
player.addMiddleValue(-10).newRefa().addMiddleValue(-26);
player.calculateScore(50, 50);
// console.log(player.getJSON());

describe.only("PrefPaperPlayer tests", function () {
	it("PrefPaperPlayer should exist", function () {
		expect(PrefPaperPlayer).to.exist;
	});

	describe("PrefPaperPlayer constructor tests", function () {
		it("contructor should create object", function () {
			expect(() => new PrefPaperPlayer()).to.throw();
			expect(() => new PrefPaperPlayer("cope")).to.throw();
			expect(() => new PrefPaperPlayer("cope", 60)).to.not.throw();
			expect(new PrefPaperPlayer("cope", 60)).to.be.an("object");
		});
	});

	describe("PrefPaperPlayer reset tests", function () {
		let column1 = new PrefPaperPlayer("cope", 30).addLeftValue(10).addRightValue(50).addMiddleValue(-10).newRefa().reset();
		it("reset should return soup to initial values", function () {
			expect(column1.getLeftValue()).to.be.equal(0);
			expect(column1.getMiddleValue()).to.be.equal(30);
			expect(column1.getRightValue()).to.be.equal(0);
			expect(column1.getJSON()).to.deep.equal({
				username: "cope",
				score: 300,
				refe: 0,
				left: [],
				middle: [30],
				right: []
			});
		});
		let column2 = new PrefPaperPlayer("cope", 30).addLeftValue(10).newRefa().addMiddleValue(-26).addRightValue(20).reset();
		it("reset should return middle to initial values", function () {
			expect(column2.getLeftValue()).to.be.equal(0);
			expect(column2.getMiddleValue()).to.be.equal(30);
			expect(column1.getRightValue()).to.be.equal(0);
			expect(column2.getJSON()).to.deep.equal({
				username: "cope",
				score: 300,
				refe: 0,
				left: [],
				middle: [30],
				right: []
			});
		});
	});

	describe("PrefPaperPlayer getJSON tests", function () {
		it("getJSON should proper value", function () {
			expect(new PrefPaperPlayer("cope", 60).getJSON()).to.deep.equal({
				username: "cope",
				score: 600,
				refe: 0,
				left: [],
				middle: [60],
				right: []
			});
		});
		it("getJSON should proper value", function () {
			expect(player.getJSON()).to.deep.equal({
					username: "cope",
					score: 120,
					refe: 1,
					left: [10, 60],
					middle: [30, 20, {left: 0, middle: 0, right: 0}, {hat: 1}, -6],
					right: [100]
				}
			);
		});
	});

});
