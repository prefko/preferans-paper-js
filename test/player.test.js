const expect = require("chai").expect;

const PrefPaperPlayer = require("../lib/player");
// let player = new PrefPaperPlayer("cope", 60, 3);
//
// player.addLeftValue(10).addLeftValue(50);
// console.log(player.getLeftValue());

describe("PrefPaperPlayer tests", function () {
	it("PrefPaperPlayer should exist", function () {
		expect(PrefPaperPlayer).to.exist;
	});

	describe("PrefPaperPlayer constructor tests", function () {
		it("contructor should create object", function () {
			expect(() => new PrefPaperPlayer()).to.throw();
			expect(() => new PrefPaperPlayer("cope")).to.throw();
			expect(() => new PrefPaperPlayer("cope", 60)).to.not.throw();
			expect(() => new PrefPaperPlayer("cope", 60, 3)).to.not.throw();
			expect(new PrefPaperPlayer("cope", 60)).to.be.an("object");
			expect(new PrefPaperPlayer("cope", 60, 3)).to.be.an("object");
		});
	});

	describe("PrefPaperPlayer getJSON basic tests", function () {
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
	});

});
