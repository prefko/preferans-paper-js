#!/usr/bin/env node
"use strict";

import {expect} from 'chai';
import PrefPaper from "../src/prefPaper";
import {PrefPaperPosition} from "../src/prefPaperEnums";
import PrefPaperFollower from "../src/prefPaperFollower";

describe("PrefPaper tests", () => {

	describe("PrefPaper classes constructors tests", () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it("constructors should work", () => {
			expect(() => new PrefPaper("cope", rand + 1)).to.throw();
			expect(() => new PrefPaper("cope", rand)).to.not.throw();
			expect(new PrefPaper("cope", rand)).to.be.an("object");
			expect(new PrefPaper("cope", rand).username).to.be.equal("cope");
			expect(() => new PrefPaper("cope", rand + 1, 2)).to.throw();
			expect(() => new PrefPaper("cope", rand, 2)).to.not.throw();
			expect(new PrefPaper("cope", rand, 2)).to.be.an("object");
			expect(new PrefPaper("cope", rand, 2).username).to.be.equal("cope");
		});
	});

	describe("PrefPaper method tests", () => {
		const mini1 = {username: "cope", left: 0, middle: 60, right: 0, refas: Infinity, unusedRefas: Infinity};
		const paper1 = new PrefPaper("cope", 60);
		it("PrefPaper infinite refas methods should work properly", () => {
			expect(paper1.left).to.be.equal(0);
			expect(paper1.left).to.be.equal(0);
			expect(paper1.middle).to.deep.equal(60);
			expect(paper1.right).to.equal(0);
			expect(paper1.mini).to.deep.equal(mini1);
		});

		const paper1b = new PrefPaper("cope", 60).reset();
		it("PrefPaper infinite refas after reset methods should work properly", () => {
			expect(paper1b.left).to.be.equal(0);
			expect(paper1b.middle).to.deep.equal(60);
			expect(paper1b.right).to.equal(0);
			expect(paper1b.mini).to.deep.equal(mini1);
		});

		const mini2 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2};
		const paper2 = new PrefPaper("cope", 60, 2);
		it("PrefPaper methods should work properly", () => {
			expect(paper2.left).to.be.equal(0);
			expect(paper2.middle).to.deep.equal(60);
			expect(paper2.right).to.equal(0);
			expect(paper2.mini).to.deep.equal(mini2);
		});

		const paper2b = new PrefPaper("cope", 60, 2).reset();
		it("PrefPaper after reset methods should work properly", () => {
			expect(paper2b.left).to.be.equal(0);
			expect(paper2b.middle).to.deep.equal(60);
			expect(paper2b.right).to.equal(0);
			expect(paper2b.mini).to.deep.equal(mini2);
		});

		const mini3 = {username: "cope", left: 0, middle: 60, right: 0, refas: 0, unusedRefas: 0};
		const paper3 = new PrefPaper("cope", 60, 0);
		it("PrefPaper methods should work properly", () => {
			expect(paper3.left).to.be.equal(0);
			expect(paper3.middle).to.deep.equal(60);
			expect(paper3.right).to.equal(0);
			expect(paper3.mini).to.deep.equal(mini3);
		});

		const paper3b = new PrefPaper("cope", 60, 0).reset();
		it("PrefPaper after reset methods should work properly", () => {
			expect(paper3b.left).to.be.equal(0);
			expect(paper3b.middle).to.deep.equal(60);
			expect(paper3b.right).to.equal(0);
			expect(paper3b.mini).to.deep.equal(mini3);
		});
	});

	describe("PrefPaper addNewRefa tests", () => {
		const mini1 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 1};
		const paper1 = new PrefPaper("cope", 60, 2).addNewRefa();
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper1.mini).to.deep.equal(mini1);
		});

		const mini2 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 0};
		const paper2 = new PrefPaper("cope", 60, 2).addNewRefa().addNewRefa();
		it("PrefPaper addNewRefa 2 should work properly", () => {
			expect(paper2.mini).to.deep.equal(mini2);
		});

		it("PrefPaper addNewRefa should throw", () => {
			expect(() => new PrefPaper("cope", 60, 0).addNewRefa()).to.throw();
		});
	});

	describe("PrefPaper markPlayedRefa tests", () => {
		const mini = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 1};
		const paper = new PrefPaper("cope", 60, 2)
			.addNewRefa()
			.markPlayedRefa(PrefPaperPosition.LEFT, true);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper.mini).to.deep.equal(mini);
		});
	});

	describe("PrefPaper add values tests", () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it("PrefPaper addLeftSupa should throw", () => {
			expect(() => new PrefPaper("cope", 60).addMiddleValue(rand + 1)).to.throw();
		});
	});

	describe("PrefPaper processFollowing tests", () => {
		const follower1 = new PrefPaperFollower("mitko", true, 3);
		const mini1 = {username: "cope", left: 30, middle: 60, right: 0, refas: 2, unusedRefas: 2};
		const paper1 = new PrefPaper("cope", 60, 2)
			.processFollowing(PrefPaperPosition.LEFT, 10, follower1);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper1.mini).to.deep.equal(mini1);
		});

		const follower2 = new PrefPaperFollower("mitko", true, 3);
		const mini2 = {username: "cope", left: 0, middle: 60, right: 30, refas: 2, unusedRefas: 2};
		const paper2 = new PrefPaper("cope", 60, 2)
			.processFollowing(PrefPaperPosition.RIGHT, 10, follower2);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper2.mini).to.deep.equal(mini2);
		});

		it("PrefPaper addLeftSupa should throw", () => {
			expect(() => new PrefPaper("cope", 60)
				.processFollowing(PrefPaperPosition.MIDDLE, 10, follower2)).to.throw();
		});

		const follower3 = new PrefPaperFollower("mitko", true, 3, true);
		const mini3 = {username: "cope", left: 30, middle: 70, right: 0, refas: 2, unusedRefas: 2};
		const paper3 = new PrefPaper("cope", 60, 2)
			.processFollowing(PrefPaperPosition.LEFT, 10, follower3);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper3.mini).to.deep.equal(mini3);
		});

		const follower4 = new PrefPaperFollower("mitko", true, 3, true);
		const mini4 = {username: "cope", left: 0, middle: 70, right: 30, refas: 2, unusedRefas: 2};
		const paper4 = new PrefPaper("cope", 60, 2)
			.processFollowing(PrefPaperPosition.RIGHT, 10, follower4);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper4.mini).to.deep.equal(mini4);
		});

		const follower5 = new PrefPaperFollower("mitko", false, 3);
		const mini5 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2};
		const paper5 = new PrefPaper("cope", 60, 2)
			.processFollowing(PrefPaperPosition.LEFT, 10, follower5);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper5.mini).to.deep.equal(mini5);
		});

		const follower6 = new PrefPaperFollower("mitko", true, 3, true);
		const mini6 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2};
		const paper6 = new PrefPaper("cope", 60, 2)
			.processFollowing(PrefPaperPosition.LEFT, 10, follower6, true);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper6.mini).to.deep.equal(mini6);
		});

		const follower7 = new PrefPaperFollower("mitko", true, 3);
		const mini7 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2};
		const paper7 = new PrefPaper("cope", 60, 2)
			.processFollowing(PrefPaperPosition.RIGHT, 10, follower7, true);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper7.mini).to.deep.equal(mini7);
		});

	});

	describe("PrefPaper markPlayedRefa tests", () => {
		const follower = new PrefPaperFollower("mitko", true, 3);
		const failer = new PrefPaperFollower("mitko", true, 1, true);
		const json =
			{
				left: [10],
				middle:
					[
						60,
						{left: 1, middle: -1, right: 0},
						50,
						{value: 38, repealed: true},
						60
					],
				right: [30],
				refas: 5,
				unusedRefas: 4,
				username: 'cope'
			};
		const paper = new PrefPaper("cope", 60, 5)
			.addNewRefa()
			.addMiddleValue(-10)
			.processFollowing(PrefPaperPosition.RIGHT, 10, follower)
			.addMiddleValue(-12, true)
			.processFollowing(PrefPaperPosition.LEFT, 10, failer)
			.markPlayedRefa(PrefPaperPosition.LEFT, true);
		it("PrefPaper addNewRefa 1 should work properly", () => {
			expect(paper.json).to.deep.equal(json);
		});
	});

});
