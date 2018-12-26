#!/usr/bin/env node
"use strict";

import {expect} from 'chai';
import PrefPaperFollower from "../src/prefPaperFollower";

describe("PrefPaperFollower tests", () => {

	describe("PrefPaperFollower classes constructors tests", () => {
		it("constructors should work", () => {
			expect(() => new PrefPaperFollower("cope", false)).to.not.throw();
			expect(new PrefPaperFollower("cope", false)).to.be.an("object");
			expect(() => new PrefPaperFollower("cope", true, 2)).to.not.throw();
			expect(new PrefPaperFollower("cope", true, 2)).to.be.an("object");
			expect(() => new PrefPaperFollower("cope", true, 1, true)).to.not.throw();
			expect(new PrefPaperFollower("cope", true, 1, true)).to.be.an("object");
		});
	});

	describe("PrefPaperFollower methods tests", () => {
		const follower1 = new PrefPaperFollower("cope", true, 3);
		it("PrefPaperFollower methods should return proper values", () => {
			expect(follower1.username).to.be.equal("cope");
			expect(follower1.followed).to.be.equal(true);
			expect(follower1.tricks).to.be.equal(3);
			expect(follower1.failed).to.be.equal(false);
		});

		const follower2 = new PrefPaperFollower("cope", true, 1, true);
		it("PrefPaperFollower methods for failed should return proper values", () => {
			expect(follower2.username).to.be.equal("cope");
			expect(follower2.followed).to.be.equal(true);
			expect(follower2.tricks).to.be.equal(1);
			expect(follower2.failed).to.be.equal(true);
		});

		const follower3 = new PrefPaperFollower("cope", false, 0);
		it("PrefPaperFollower methods for not followed should return proper values", () => {
			expect(follower3.username).to.be.equal("cope");
			expect(follower3.followed).to.be.equal(false);
			expect(follower3.tricks).to.be.equal(0);
			expect(follower3.failed).to.be.equal(false);
		});

		const follower4 = new PrefPaperFollower("cope", false, 0, true);
		it("PrefPaperFollower methods for not followed and failed should return proper values", () => {
			expect(follower4.username).to.be.equal("cope");
			expect(follower4.followed).to.be.equal(false);
			expect(follower4.tricks).to.be.equal(0);
			expect(follower4.failed).to.be.equal(true);
		});
	});

});
