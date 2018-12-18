const expect = require("chai").expect;

const PrefPapersPaper = require("../lib/player");
let player = new PrefPapersPaper("cope", 30);
player.addValue("left", 10).newRefa().addValue("left", 50).addValue("right", 100);
player.addMiddleValue(-10).newRefa().addMiddleValue(-26).newRefa();
player.markLeftPlayedRefa().markMiddlePlayedRefa(true).markRightPlayedRefa(true);
player.markLeftPlayedRefa(true).markMiddlePlayedRefa().markRightPlayedRefa();
player.calculateScore(50, 50);

describe("PrefPapersPaper tests", () => {
	it("PrefPapersPaper should exist", () => {
		expect(PrefPapersPaper).to.exist;
	});

	describe("PrefPapersPaper constructor tests", () => {
		it("contructor should create object", () => {
			expect(() => new PrefPapersPaper()).to.throw();
			expect(() => new PrefPapersPaper("cope")).to.throw();
			expect(() => new PrefPapersPaper("cope", 60)).to.not.throw();
			expect(new PrefPapersPaper("cope", 60)).to.be.an("object");
		});
	});

	describe("PrefPapersPaper processMyFollowing tests", () => {
		it("processMyFollowing should throw properly", () => {
			expect(() => new PrefPapersPaper("cope", 30).processMyFollowing({followed: true, tricks: 3, value: 10, mainPosition: "maybe"})).to.throw();
			expect(() => new PrefPapersPaper("cope", 30).processMyFollowing({followed: true, tricks: 3, value: 10, mainPosition: "left"})).to.not.throw();
			expect(() => new PrefPapersPaper("cope", 30).processMyFollowing()).to.throw();
		});
		let p1 = new PrefPapersPaper("cope", 60);
		p1.processMyFollowing({followed: true, tricks: 3, value: 10, mainPosition: "right"}).calculateScore();
		it("processMyFollowing should return proper value for pass", () => {
			expect(p1.getMiniJSON()).to.deep.equal({
				username: "cope",
				score: -570,
				left: 0,
				middle: 60,
				right: 30
			});
		});
		let p2 = new PrefPapersPaper("cope", 30);
		p2.processMyFollowing({followed: true, tricks: 2, failed: true, value: 8, mainPosition: "left"}).calculateScore();
		it("processMyFollowing should return proper value for fail", () => {
			expect(p2.getMiniJSON()).to.deep.equal({
					username: "cope",
					score: -364,
					left: 16,
					middle: 38,
					right: 0
				}
			);
		});
	});

	describe("PrefPapersPaper reset tests", () => {
		var base = {
			username: "cope",
			score: -300,
			refe: 0,
			left: [],
			middle: [30],
			right: []
		};
		let p1 = new PrefPapersPaper("cope", 30).addValue("left", 10).addValue("right", 50).addMiddleValue(-10).newRefa().reset();
		it("reset should return player to initial values", () => {
			expect(p1.getLeftValue()).to.be.equal(0);
			expect(p1.getMiddleValue()).to.be.equal(30);
			expect(p1.getRightValue()).to.be.equal(0);
			expect(p1.getJSON()).to.deep.equal(base);
		});
		let p2 = new PrefPapersPaper("cope", 30).addValue("left", 10).newRefa().addMiddleValue(-26).addValue("right", 20).reset();
		it("reset should return player to initial values", () => {
			expect(p2.getLeftValue()).to.be.equal(0);
			expect(p2.getMiddleValue()).to.be.equal(30);
			expect(p1.getRightValue()).to.be.equal(0);
			expect(p2.getJSON()).to.deep.equal(base);
		});
	});

	describe("PrefPapersPaper hasUnplayedRefa tests", () => {
		it("hasUnplayedRefa should return proper value", () => {
			expect(new PrefPapersPaper("cope", 30).hasUnplayedRefa()).to.be.equal(false);
			expect(player.hasUnplayedRefa()).to.be.equal(true);
		});
	});

	describe("PrefPapersPaper getMiniJSON tests", () => {
		it("getMiniJSON should return proper value", () => {
			expect(new PrefPapersPaper("cope", 60).getMiniJSON()).to.deep.equal({
				username: "cope",
				score: -600,
				left: 0,
				middle: 60,
				right: 0
			});
		});
		it("getMiniJSON should return proper value", () => {
			expect(player.getMiniJSON()).to.deep.equal({
					username: "cope",
					score: 120,
					left: 60,
					middle: -6,
					right: 100
				}
			);
		});
	});

	describe("PrefPapersPaper getJSON tests", () => {
		it("getJSON should return proper value", () => {
			expect(new PrefPapersPaper("cope", 60).getJSON()).to.deep.equal({
				username: "cope",
				score: -600,
				refe: 0,
				left: [],
				middle: [60],
				right: []
			});
		});

		it("getJSON should return proper value", () => {
			expect(player.getJSON()).to.deep.equal({
					username: "cope",
					score: 120,
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
