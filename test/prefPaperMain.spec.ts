#!/usr/bin/env node
"use strict";

import {expect} from 'chai';
import PrefPaperMain from "../src/prefPaperMain";

describe("PrefPaperMain tests", () => {

	describe("PrefPaperMain classes constructors tests", () => {
		it("constructors should work", () => {
			expect(() => new PrefPaperMain("cope")).to.not.throw();
			expect(new PrefPaperMain("cope")).to.be.an("object");
			expect(() => new PrefPaperMain("cope", 2)).to.not.throw();
			expect(new PrefPaperMain("cope", 2)).to.be.an("object");
			expect(() => new PrefPaperMain("cope", 1, true)).to.not.throw();
			expect(new PrefPaperMain("cope", 1, true)).to.be.an("object");
		});
	});

	describe("PrefPaperMain methods tests", () => {
		const follower1 = new PrefPaperMain("cope", 3);
		it("PrefPaperMain methods should return proper values", () => {
			expect(follower1.username).to.equal("cope");
			expect(follower1.tricks).to.equal(3);
			expect(follower1.failed).to.equal(false);
		});

		const follower2 = new PrefPaperMain("cope", 1, true);
		it("PrefPaperMain methods for failed should return proper values", () => {
			expect(follower2.username).to.equal("cope");
			expect(follower2.tricks).to.equal(1);
			expect(follower2.failed).to.equal(true);
		});

		const follower3 = new PrefPaperMain("cope", 0);
		it("PrefPaperMain methods for not followed should return proper values", () => {
			expect(follower3.username).to.equal("cope");
			expect(follower3.tricks).to.equal(0);
			expect(follower3.failed).to.equal(false);
		});

		const follower4 = new PrefPaperMain("cope", 0, true);
		it("PrefPaperMain methods for not followed and failed should return proper values", () => {
			expect(follower4.username).to.equal("cope");
			expect(follower4.tricks).to.equal(0);
			expect(follower4.failed).to.equal(true);
		});
	});

});
