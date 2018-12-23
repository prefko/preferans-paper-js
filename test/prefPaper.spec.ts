import {expect} from 'chai';

import PrefPaper from "../src/prefPaper";

describe("PrefPaper tests", () => {

	describe("PrefPaper classes constructors tests", () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it("constructors should work", () => {
			expect(() => new PrefPaper("cope", rand + 1)).to.throw();
			expect(() => new PrefPaper("cope", rand)).to.not.throw();
			expect(new PrefPaper("cope", rand)).to.be.an("object");
			expect(() => new PrefPaper("cope", rand + 1, 2)).to.throw();
			expect(() => new PrefPaper("cope", rand, 2)).to.not.throw();
			expect(new PrefPaper("cope", rand, 2)).to.be.an("object");
		});
	});

	describe("PrefPaper method tests", () => {
		let json1 = {username: "cope", left: 0, middle: 60, right: 0, refas: Infinity, unusedRefas: Infinity};
		let paper1 = new PrefPaper("cope", 60);
		it("PrefPaper infinite refas methods should should work properly", () => {
			expect(paper1.left).to.be.equal(0);
			expect(paper1.middle).to.deep.equal(60);
			expect(paper1.right).to.equal(0);
			expect(paper1.json).to.deep.equal(json1);
		});

		let paper1b = new PrefPaper("cope", 60).reset();
		it("PrefPaper infinite refas after reset methods should should work properly", () => {
			expect(paper1b.left).to.be.equal(0);
			expect(paper1b.middle).to.deep.equal(60);
			expect(paper1b.right).to.equal(0);
			expect(paper1b.json).to.deep.equal(json1);
		});

		let json2 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2};
		let paper2 = new PrefPaper("cope", 60, 2);
		it("PrefPaper methods should should work properly", () => {
			expect(paper2.left).to.be.equal(0);
			expect(paper2.middle).to.deep.equal(60);
			expect(paper2.right).to.equal(0);
			expect(paper2.json).to.deep.equal(json2);
		});

		let paper2b = new PrefPaper("cope", 60, 2).reset();
		it("PrefPaper after reset methods should should work properly", () => {
			expect(paper2b.left).to.be.equal(0);
			expect(paper2b.middle).to.deep.equal(60);
			expect(paper2b.right).to.equal(0);
			expect(paper2b.json).to.deep.equal(json2);
		});
	});

});
