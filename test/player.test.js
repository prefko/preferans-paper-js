const expect = require("chai").expect;

const PrefPaperPlayer = require("../lib/player");
let player = new PrefPaperPlayer("cope", 30);
player.addLeftValue(10).newRefa().addLeftValue(50).addRightValue(100);
player.addMiddleValue(-10).newRefa().addMiddleValue(-26).newRefa();
player.markLeftPlayedRefa().markMiddlePlayedRefa(true).markRightPlayedRefa(true);
player.markLeftPlayedRefa(true).markMiddlePlayedRefa().markRightPlayedRefa();
player.calculateScore(50, 50);
// console.log(player.getJSON());

describe("PrefPaperPlayer tests", function () {
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

	describe("PrefPaperPlayer processMyFollowing tests", function () {
		it("processMyFollowing should throw", function () {
			expect(() => new PrefPaperPlayer("cope", 30).processMyFollowing({followed: true, tricks: 3}, 10, "maybe")).to.throw();
			expect(() => new PrefPaperPlayer("cope", 30).processMyFollowing({followed: true, tricks: 3}, 10, "left")).to.not.throw();
		});
		let p1 = new PrefPaperPlayer("cope", 60);
		p1.processMyFollowing({followed: true, tricks: 3}, 10, "right").calculateScore();
		it("processMyFollowing should return proper value for pass", function () {
			expect(p1.getMiniJSON()).to.deep.equal({
				username: "cope",
				score: 570,
				left: 0,
				middle: 60,
				right: 30
			});
		});
		let p2 = new PrefPaperPlayer("cope", 30);
		p2.processMyFollowing({followed: true, tricks: 2, failed: true}, 8, "left").calculateScore();
		it("processMyFollowing should return proper value for fail", function () {
			expect(p2.getMiniJSON()).to.deep.equal({
					username: "cope",
					score: 364,
					left: 16,
					middle: 38,
					right: 0
				}
			);
		});
	});

	describe("PrefPaperPlayer reset tests", function () {
		let p1 = new PrefPaperPlayer("cope", 30).addLeftValue(10).addRightValue(50).addMiddleValue(-10).newRefa().reset();
		it("reset should return player to initial values", function () {
			expect(p1.getLeftValue()).to.be.equal(0);
			expect(p1.getMiddleValue()).to.be.equal(30);
			expect(p1.getRightValue()).to.be.equal(0);
			expect(p1.getJSON()).to.deep.equal({
				username: "cope",
				score: -300,
				refe: 0,
				left: [],
				middle: [30],
				right: []
			});
		});
		let p2 = new PrefPaperPlayer("cope", 30).addLeftValue(10).newRefa().addMiddleValue(-26).addRightValue(20).reset();
		it("reset should return player to initial values", function () {
			expect(p2.getLeftValue()).to.be.equal(0);
			expect(p2.getMiddleValue()).to.be.equal(30);
			expect(p1.getRightValue()).to.be.equal(0);
			expect(p2.getJSON()).to.deep.equal({
				username: "cope",
				score: -300,
				refe: 0,
				left: [],
				middle: [30],
				right: []
			});
		});
	});

	describe("PrefPaperPlayer hasUnplayedRefa tests", function () {
		it("hasUnplayedRefa should return proper value", function () {
			expect(new PrefPaperPlayer("cope", 30).hasUnplayedRefa()).to.be.equal(false);
			expect(player.hasUnplayedRefa()).to.be.equal(true);
		});
	});

	describe("PrefPaperPlayer getMiniJSON tests", function () {
		it("getMiniJSON should return proper value", function () {
			expect(new PrefPaperPlayer("cope", 60).getMiniJSON()).to.deep.equal({
				username: "cope",
				score: -600,
				left: 0,
				middle: 60,
				right: 0
			});
		});
		it("getMiniJSON should return proper value", function () {
			expect(player.getMiniJSON()).to.deep.equal({
					username: "cope",
					score: -120,
					left: 60,
					middle: -6,
					right: 100
				}
			);
		});
	});

	describe("PrefPaperPlayer getJSON tests", function () {
		it("getJSON should return proper value", function () {
			expect(new PrefPaperPlayer("cope", 60).getJSON()).to.deep.equal({
				username: "cope",
				score: -600,
				refe: 0,
				left: [],
				middle: [60],
				right: []
			});
		});

		it("getJSON should return proper value", function () {
			expect(player.getJSON()).to.deep.equal({
					username: "cope",
					score: -120,
					refe: 1,
					left: [10, 60],
					middle: [
						30, {left: 1, middle: -1, right: -1},
						20, {left: -1, middle: 1, right: 1}, {hat: 1},
						-6, {left: 0, middle: 0, right: 0}],
					right: [100]
				}
			);
		});
	});

});
