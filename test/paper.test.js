const _ = require("lodash");
const expect = require("chai").expect;

const PrefPaper = require("../lib/paper");

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

	describe("PrefPaper getPlayerByUsername tests", function () {
		it("getPlayerByUsername should throw", function () {
			expect(() => new PrefPaper(30).getPlayerByUsername("maybe")).to.throw();
			expect(() => new PrefPaper(30).getPlayerByUsername("p1")).to.not.throw();
		});
		it("getPlayerByUsername should return proper values", function () {
			expect(new PrefPaper(30).getPlayerByUsername("p1").username).to.be.equal("p1");
		});
	});

	describe("PrefPaper addHand exception tests", function () {
		it("addHand should throw", function () {
			expect(() => new PrefPaper(30).addHand()).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {}})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {}, left: {}})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {}, left: {}, right: {}})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {}, right: {}})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {}})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}})).to.not.throw();

			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}, refa: "yes"})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}, newRefa: "yes"})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2"}, invalidated: "yes"})).to.throw();

			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3", followed: true}, right: {username: "p2"}})).to.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2", followed: true}})).to.throw();

			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3", followed: true, tricks: 3}, right: {username: "p2"}})).to.not.throw();
			expect(() => new PrefPaper(30).addHand({value: 10, main: {username: "p1"}, left: {username: "p3"}, right: {username: "p2", followed: true, tricks: 3}})).to.not.throw();
			expect(() => new PrefPaper(30).addHand({
				value: 10,
				main: {username: "p1"},
				left: {username: "p3", followed: true, tricks: 3},
				right: {username: "p2", followed: true, tricks: 1}
			})).to.not.throw();
			expect(() => new PrefPaper(30).addHand({
				value: 10,
				main: {username: "p1", failed: true},
				left: {username: "p3", followed: true, tricks: 3},
				right: {username: "p2", followed: true, tricks: 1}
			})).to.not.throw();
			expect(() => new PrefPaper(30).addHand({
				value: 10,
				main: {username: "p1", failed: true},
				left: {username: "p3", followed: true, tricks: 3},
				right: {username: "p2", followed: true, tricks: 3}
			})).to.throw();
			expect(() => new PrefPaper(30).addHand({
				value: 10,
				main: {username: "p1"},
				left: {username: "p3", followed: true, tricks: 1, failed: true},
				right: {username: "p2", followed: true, tricks: 1, failed: true}
			})).to.not.throw();
			expect(() => new PrefPaper(30).addHand({
				value: 10,
				main: {username: "p1", failed: true},
				left: {username: "p3", followed: true, tricks: 2},
				right: {username: "p2", followed: true, tricks: 1, failed: true}
			})).to.throw();
		});
	});

});
