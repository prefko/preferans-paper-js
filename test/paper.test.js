const _ = require("lodash");
const expect = require("chai").expect;

const PrefPaper = require("../lib/paper");

let paper = new PrefPaper(30, 2);
paper.addHand({value: 10, main: {username: "p1", faile: true}, left: {username: "p3"}, right: {username: "p2"}});
paper.addHand({newRefa: true});
paper.addHand({newRefa: true});
paper.addHand({value: 16, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}});
paper.addHand({value: 8, main: {username: "p2"}, left: {username: "p1", faile: true}, right: {username: "p3"}});
paper.addHand({value: 14, main: {username: "p3"}, left: {username: "p2"}, right: {username: "p1", faile: true}});

describe("PrefPaper tests", function () {
	it("PrefPaper should exist", function () {
		expect(PrefPaper).to.exist;
	});

	describe("PrefPaper constructor tests", function () {
		it("contructor should create object", function () {
			expect(() => new PrefPaper()).to.throw();
			expect(() => new PrefPaper(60)).to.not.throw();
			expect(new PrefPaper(60)).to.be.an("object");
		});
	});

	describe("PrefPaper getHandCount tests", function () {
		it("getHandCount should return proper values", function () {
			expect(paper.getHandCount()).to.be.equal(6);
			expect(new PrefPaper(30).getHandCount()).to.be.equal(0);
		});
	});

	describe("PrefPaper getPlayerByUsername tests", function () {
		it("getPlayerByUsername should throw properly", function () {
			expect(() => new PrefPaper(30).getPlayerByUsername("maybe")).to.throw();
			expect(() => new PrefPaper(30).getPlayerByUsername("p1")).to.not.throw();
		});
		it("getPlayerByUsername should return proper values", function () {
			expect(new PrefPaper(30).getPlayerByUsername("p1").username).to.be.equal("p1");
		});
	});

	describe("PrefPaper isValidHand exception tests", function () {
		it("isValidHand should return proper value for objects", function () {
			expect(PrefPaper.isValidHand()).to.be.equal(false);
			expect(PrefPaper.isValidHand({})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {}, left: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({newRefa: true})).to.be.equal(true);
		});
		it("isValidHand should return proper value for usernames", function () {
			expect(PrefPaper.isValidHand({value: 10, main: {}, left: {}, right: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {}, right: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})).to.be.equal(true);
		});
		it("isValidHand should return proper value for child attributes", function () {
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}, newRefa: "yes"})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}, invalidated: "yes"})).to.be.equal(false);

			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3", followed: true}, right: {username: "p2"}})).to.be.equal(false);
			expect(PrefPaper.isValidHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2", followed: true}})).to.be.equal(false);
		});
		it("isValidHand should return proper value for tricks", function () {
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
		it("isValidHand should return proper value for fails", function () {
			expect(
				PrefPaper.isValidHand({
					value: 10,
					main: {username: "p1", failed: true},
					left: {username: "p3", followed: true, tricks: 3},
					right: {username: "p2", followed: true, tricks: 1}
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

	describe("PrefPaper addHand tests", function () {
		it("addHand should throw properly", function () {
			expect(() => new PrefPaper(30).addHand({})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})).to.not.throw();
		});
		it("getPlayerByUsername should return proper values", function () {
			expect(
				new PrefPaper(30)
					.addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})
					.getHandCount()
			).to.be.equal(1);
		});
	});

	describe("PrefPaper changeHand tests", function () {
		it("changeHand should throw properly", function () {
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
			).to.not.throw();
		});
		it("changeHand should return proper values", function () {
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

	describe("PrefPaper invalidateHand tests", function () {
		it("invalidateHand should throw properly", function () {
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
		it("invalidateHand should return proper values", function () {
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

	describe("PrefPaper processNewRefa tests", function () {
		it("processNewRefa should throw properly", function () {
			expect(() => paper.addHand({newRefa: true})).to.throw();
			expect(() => paper.processNewRefa()).to.throw();
			expect(() => new PrefPaper(30).addHand({newRefa: true})).to.not.throw();
			expect(() => new PrefPaper(30).processNewRefa()).to.not.throw();
		});
	});

	describe("PrefPaper getJSON tests", function () {
		it("getJSON should return proper value", function () {
			expect(new PrefPaper(30).getJSON()).to.deep.equal({
				p1: {username: "p1", score: -300, refe: 0, left: [], middle: [30], right: []},
				p2: {username: "p2", score: -300, refe: 0, left: [], middle: [30], right: []},
				p3: {username: "p3", score: -300, refe: 0, left: [], middle: [30], right: []}
			});
		});
		it("getJSON should return proper value", function () {
			expect(paper.getJSON()).to.deep.equal({
				p1: {username: "p1", score: -40, refe: 1, left: [], middle: [30, 20, {left: 1, middle: 1, right: 1}, {left: 0, middle: 0, right: 0}, 4], right: []},
				p2: {username: "p2", score: -220, refe: 1, left: [], middle: [30, {left: 1, middle: 1, right: 1}, {left: 0, middle: 0, right: 0}, 22], right: []},
				p3: {username: "p3", score: -160, refe: 1, left: [], middle: [30, {left: 1, middle: 1, right: 1}, {left: 0, middle: 0, right: 0}, 16], right: []}
			});
		});
	});

});
