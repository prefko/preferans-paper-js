const _ = require("lodash");
const expect = require("chai").expect;

const PrefPaper = require("../lib/paper");

let paper = new PrefPaper(30, 2);
paper.addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}});
paper.addHand({newRefa: true});
paper.addHand({newRefa: true});
paper.addHand({value: 16, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}});
paper.addHand({value: 4, main: {username: "p2", failed: true}, left: {username: "p1", followed: true, tricks: 5}, right: {username: "p3"}});
paper.addHand({value: 8, main: {username: "p2"}, left: {username: "p1", followed: true, tricks: 1, failed: true}, right: {username: "p3"}});
paper.addHand({value: 14, main: {username: "p3"}, left: {username: "p2"}, right: {username: "p1", followed: true, tricks: 1, failed: true}});

describe("PrefPaper tests", () => {
	it("PrefPaper should exist", () => {
		expect(PrefPaper).to.exist;
	});

	describe("PrefPaper constructor tests", () => {
		it("contructor should create object", () => {
			expect(() => new PrefPaper()).to.throw();
			expect(() => new PrefPaper(60)).to.not.throw();
			expect(new PrefPaper(60)).to.be.an("object");
		});
	});

	describe("PrefPaper getHandCount tests", () => {
		it("getHandCount should return proper values", () => {
			expect(paper.getHandCount()).to.be.equal(7);
			expect(new PrefPaper(30).getHandCount()).to.be.equal(0);
		});
	});

	describe("PrefPaper getPlayerByUsername tests", () => {
		it("getPlayerByUsername should throw properly", () => {
			expect(() => new PrefPaper(30).getPlayerByUsername("maybe")).to.throw();
			expect(() => new PrefPaper(30).getPlayerByUsername("p1")).to.not.throw();
		});
		it("getPlayerByUsername should return proper values", () => {
			expect(new PrefPaper(30).getPlayerByUsername("p1").username).to.be.equal("p1");
		});
	});

	describe("PrefPaper isValidHand exception tests", () => {
		it("isValidHand should return proper value for objects", () => {
			expect(PrefPaper.isValidHand()).to.be.equal(false);
			expect(PrefPaper.isValidHand({})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {}, left: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({newRefa: true})).to.be.equal(true);
		});
		it("isValidHand should return proper value for usernames", () => {
			expect(PrefPaper.isValidHand({value: 10, main: {}, left: {}, right: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {}, right: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})).to.be.equal(true);
		});
		it("isValidHand should return proper value for child attributes", () => {
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}, newRefa: "yes"})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}, invalidated: "yes"})).to.be.equal(false);

			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3", followed: true}, right: {username: "p2"}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2", followed: true}})).to.be.equal(false);
		});
		it("isValidHand should return proper value for tricks", () => {
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1"},
					left: {username: "p3", followed: true, tricks: 3},
					right: {username: "p2"}
				})
			).to.be.equal(true);
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1"},
					left: {username: "p3"},
					right: {username: "p2", followed: true, tricks: 3}
				})
			).to.be.equal(true);
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1"},
					left: {username: "p3", followed: true, tricks: 3},
					right: {username: "p2", followed: true, tricks: 1}
				})
			).to.be.equal(true);
		});
		it("isValidHand should return proper value for fails", () => {
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1", failed: true},
					left: {username: "p3", followed: true, tricks: 3},
					right: {username: "p2", followed: true, tricks: 2}
				})
			).to.be.equal(true);
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1", failed: true},
					left: {username: "p3", followed: true, tricks: 3},
					right: {username: "p2", followed: true, tricks: 3}
				})
			).to.be.equal(false);
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1"},
					left: {username: "p3", followed: true, tricks: 1, failed: true},
					right: {username: "p2", followed: true, tricks: 1, failed: true}
				})
			).to.be.equal(true);
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1", failed: true},
					left: {username: "p3", followed: true, tricks: 2},
					right: {username: "p2", followed: true, tricks: 1, failed: true}
				})
			).to.be.equal(false);
		});
	});

	describe("PrefPaper addHand tests", () => {
		it("addHand should throw properly", () => {
			expect(() => new PrefPaper(30).addHand({})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})).to.not.throw();
		});
		it("getPlayerByUsername should return proper values", () => {
			expect(
				new PrefPaper(30)
					.addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})
					.getHandCount()
			).to.be.equal(1);
		});
	});

	describe("PrefPaper changeHand tests", () => {
		it("changeHand should throw properly", () => {
			expect(() => new PrefPaper(30).changeHand()).to.throw();
			expect(() => new PrefPaper(30).changeHand(1)).to.throw();
			expect(() => new PrefPaper(30)
				.addHand({newRefa: true})
				.changeHand(1)
			).to.throw();
			expect(() => new PrefPaper(30)
				.addHand({newRefa: true})
				.changeHand(2)
			).to.throw();
			expect(() => new PrefPaper(30)
				.addHand({newRefa: true})
				.changeHand(1, {value: 10, main: {username: "p1", failed: true}, left: {username: "p3"}, right: {username: "p2"}})
			).to.throw();
			expect(() => new PrefPaper(30)
				.addHand({newRefa: true})
				.changeHand(1, {value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})
			).to.not.throw();
		});
		it("changeHand should return proper values", () => {
			expect(new PrefPaper(30)
				.addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})
				.changeHand(1, {newRefa: true})
				.getJSON()
			).to.deep.equal({
				p1: {username: "p1", score: -300, refe: 1, left: [], middle: [30, {left: 0, middle: 0, right: 0}], right: []},
				p2: {username: "p2", score: -300, refe: 1, left: [], middle: [30, {left: 0, middle: 0, right: 0}], right: []},
				p3: {username: "p3", score: -300, refe: 1, left: [], middle: [30, {left: 0, middle: 0, right: 0}], right: []}
			});
		});
	});

	describe("PrefPaper invalidateHand tests", () => {
		it("invalidateHand should throw properly", () => {
			expect(() => new PrefPaper(30).invalidateHand()).to.throw();
			expect(() => new PrefPaper(30).invalidateHand(1)).to.throw();
			expect(() => new PrefPaper(30)
				.addHand({newRefa: true})
				.invalidateHand(2)
			).to.throw();
			expect(() => new PrefPaper(30)
				.addHand({newRefa: true})
				.invalidateHand(1)
			).to.not.throw();
		});
		it("invalidateHand should return proper values", () => {
			expect(new PrefPaper(30)
				.addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})
				.invalidateHand(1)
				.getJSON()
			).to.deep.equal({
				p1: {username: "p1", score: -300, refe: 0, left: [], middle: [30, {invalidated: true, value: 20}], right: []},
				p2: {username: "p2", score: -300, refe: 0, left: [], middle: [30], right: []},
				p3: {username: "p3", score: -300, refe: 0, left: [], middle: [30], right: []}
			});
		});
	});

	describe("PrefPaper processNewRefa tests", () => {
		it("processNewRefa should throw properly", () => {
			expect(() => paper.addHand({newRefa: true})).to.throw();
			expect(() => paper.processNewRefa()).to.throw();
			expect(() => new PrefPaper(30).addHand({newRefa: true})).to.not.throw();
			expect(() => new PrefPaper(30).processNewRefa()).to.not.throw();
		});
	});

	describe("PrefPaper getJSON tests", () => {
		it("getJSON should return proper value for empty paper", () => {
			expect(new PrefPaper(30).getJSON()).to.deep.equal({
				p1: {username: "p1", score: -300, refe: 0, left: [], middle: [30], right: []},
				p2: {username: "p2", score: -300, refe: 0, left: [], middle: [30], right: []},
				p3: {username: "p3", score: -300, refe: 0, left: [], middle: [30], right: []}
			});
		});
		it("getJSON should return proper value for active paper", () => {
			expect(paper.getJSON()).to.deep.equal({
				p1: {username: "p1", score: -106, refe: 1, left: [], middle: [30, 20, {left: 1, middle: 1, right: -1}, {left: 0, middle: 0, right: 1}, 4, 12], right: [20, 28]},
				p2: {username: "p2", score: -414, refe: 0, left: [14], middle: [30, {left: 1, middle: -1, right: 1}, {left: 0, middle: 1, right: 0}, 34, 26, 40], right: []},
				p3: {username: "p3", score: -160, refe: 1, left: [], middle: [30, {left: -1, middle: 1, right: 1}, {left: 1, middle: 0, right: 0}, 16], right: []}
			});
		});
	});
});
