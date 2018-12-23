import {expect} from 'chai';

import PrefPaper from "../src/prefPaper";

describe("PrefPaper tests", () => {

	describe("PrefPaper classes constructors tests", () => {
		let rand = Math.ceil((Math.random() * 1000)) * 2;
		it("constructors should work", () => {
			expect(() => new PrefPaper("cope", rand + 1)).to.throw();
			expect(() => new PrefPaper("cope", rand)).to.not.throw();
			expect(new PrefPaper("cope", rand)).to.be.an("object");
			expect(() => new PrefPaper("cope", rand + 1, 2)).to.throw();
			expect(() => new PrefPaper("cope", rand, 2)).to.not.throw();
			expect(new PrefPaper("cope", rand, 2)).to.be.an("object");
		});
	});

});
