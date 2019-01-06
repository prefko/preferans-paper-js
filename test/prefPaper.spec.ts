#!/usr/bin/env node
'use strict';

import { expect } from 'chai';
import PrefPaper from '../src/prefPaper';
import { PrefPaperPosition } from '../src/prefPaperEnums';
import PrefPaperFollower from '../src/prefPaperFollower';
import PrefPaperMain from '../src/prefPaperMain';

describe('PrefPaper tests', () => {

	describe('PrefPaper classes constructors tests', () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it('constructors should work', () => {
			expect(() => new PrefPaper('cope', rand + 1)).to.throw();
			expect(() => new PrefPaper('cope', rand)).to.not.throw();
			expect(new PrefPaper('cope', rand)).to.be.an('object');
			expect(new PrefPaper('cope', rand).username).to.equal('cope');
			expect(() => new PrefPaper('cope', rand + 1, 2)).to.throw();
			expect(() => new PrefPaper('cope', rand, 2)).to.not.throw();
			expect(new PrefPaper('cope', rand, 2)).to.be.an('object');
			expect(new PrefPaper('cope', rand, 2).username).to.equal('cope');
		});
	});

	describe('PrefPaper hasUnusedRefas tests', () => {
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(new PrefPaper('cope', 60).hasUnusedRefas()).to.equal(true);
			expect(new PrefPaper('cope', 60, 2).hasUnusedRefas()).to.equal(true);
			expect(new PrefPaper('cope', 60, 2).hasUnusedRefas()).to.equal(true);
			expect(new PrefPaper('cope', 60, 0).hasUnusedRefas()).to.equal(false);
		});
	});

	describe('PrefPaper method tests', () => {
		const mini1 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: Infinity, unusedRefas: Infinity };
		const paper1 = new PrefPaper('milja', 60);
		paper1.username = 'cope';
		it('PrefPaper infinite refas methods should work properly', () => {
			expect(paper1.left).to.equal(0);
			expect(paper1.left).to.equal(0);
			expect(paper1.middle).to.deep.equal(60);
			expect(paper1.right).to.equal(0);
			expect(paper1.mini).to.deep.equal(mini1);
			expect(paper1.hasUnplayedRefa()).to.equal(false);
			expect(paper1.addNewRefa().hasUnplayedRefa()).to.equal(true);
			expect(paper1.username).to.equal('cope');
		});

		const paper1b = new PrefPaper('cope', 60).reset();
		it('PrefPaper infinite refas after reset methods should work properly', () => {
			expect(paper1b.left).to.equal(0);
			expect(paper1b.middle).to.deep.equal(60);
			expect(paper1b.right).to.equal(0);
			expect(paper1b.mini).to.deep.equal(mini1);
			expect(paper1b.hasUnplayedRefa()).to.equal(false);
			expect(paper1b.addNewRefa().hasUnplayedRefa()).to.equal(true);
		});

		const mini2 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2 };
		const paper2 = new PrefPaper('cope', 60, 2);
		it('PrefPaper methods should work properly', () => {
			expect(paper2.left).to.equal(0);
			expect(paper2.middle).to.deep.equal(60);
			expect(paper2.right).to.equal(0);
			expect(paper2.mini).to.deep.equal(mini2);
			expect(paper2.hasUnplayedRefa()).to.equal(false);
			expect(paper2.addNewRefa().hasUnplayedRefa()).to.equal(true);
		});

		const paper2b = new PrefPaper('cope', 60, 2).reset();
		it('PrefPaper after reset methods should work properly', () => {
			expect(paper2b.left).to.equal(0);
			expect(paper2b.middle).to.deep.equal(60);
			expect(paper2b.right).to.equal(0);
			expect(paper2b.mini).to.deep.equal(mini2);
			expect(paper2b.hasUnplayedRefa()).to.equal(false);
			expect(paper2b.addNewRefa().hasUnplayedRefa()).to.equal(true);
		});

		const mini3 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: 0, unusedRefas: 0 };
		const paper3 = new PrefPaper('cope', 60, 0);
		it('PrefPaper methods should work properly', () => {
			expect(paper3.left).to.equal(0);
			expect(paper3.middle).to.deep.equal(60);
			expect(paper3.right).to.equal(0);
			expect(paper3.mini).to.deep.equal(mini3);
		});

		const paper3b = new PrefPaper('cope', 60, 0).reset();
		it('PrefPaper after reset methods should work properly', () => {
			expect(paper3b.left).to.equal(0);
			expect(paper3b.middle).to.deep.equal(60);
			expect(paper3b.right).to.equal(0);
			expect(paper3b.mini).to.deep.equal(mini3);
		});
	});

	describe('PrefPaper addNewRefa tests', () => {
		const mini1 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 1 };
		const paper1 = new PrefPaper('cope', 60, 2).addNewRefa();
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(paper1.mini).to.deep.equal(mini1);
		});

		const mini2 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 0 };
		const paper2 = new PrefPaper('cope', 60, 2).addNewRefa().addNewRefa();
		it('PrefPaper addNewRefa 2 should work properly', () => {
			expect(paper2.mini).to.deep.equal(mini2);
		});

		it('PrefPaper addNewRefa should throw', () => {
			expect(() => new PrefPaper('cope', 60, 0).addNewRefa()).to.throw();
		});
	});

	describe('PrefPaper markPlayedRefa tests', () => {
		const follower = new PrefPaperFollower('mitko', true, 3);
		const mini = { score: -570, username: 'cope', left: 30, middle: 60, right: 0, refas: 2, unusedRefas: 1 };
		const paper = new PrefPaper('cope', 60, 2)
		.addNewRefa()
		.processFollowing(follower, 10, true, PrefPaperPosition.LEFT)
		.calculateScore(0, 0);
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(paper.mini).to.deep.equal(mini);
		});
	});

	describe('PrefPaper add values tests', () => {
		const main = new PrefPaperMain('cope', 3);
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it('PrefPaper processMain should throw because of odd value', () => {
			expect(() => new PrefPaper('cope', 60).processMain(main, rand + 1)).to.throw();
		});
		it('PrefPaper processMain should throw because of username', () => {
			expect(() => new PrefPaper('mitko', 60).processMain(main, 10)).to.throw();
		});
	});

	describe('PrefPaper mini tests', () => {
		const follower1 = new PrefPaperFollower('milja', true, 3);
		it('PrefPaper json should throw', () => {
			expect(() => new PrefPaper('cope', 60)
				.processFollowing(follower1, 10, true, PrefPaperPosition.RIGHT)
					.mini,
			).to.throw();
		});

		const mini1 = { score: -570, username: 'cope', left: 30, middle: 60, right: 0, refas: 2, unusedRefas: 2 };
		const paper1 = new PrefPaper('cope', 60, 2)
		.processFollowing(follower1, 10, true, PrefPaperPosition.LEFT)
		.calculateScore(0, 0);
		it('PrefPaper processFollowing 1 should work properly', () => {
			expect(paper1.mini).to.deep.equal(mini1);
		});

		const follower2 = new PrefPaperFollower('milja', true, 3);
		const mini2 = { score: -570, username: 'cope', left: 0, middle: 60, right: 30, refas: 2, unusedRefas: 2 };
		const paper2 = new PrefPaper('cope', 60, 2)
		.processFollowing(follower2, 10, true, PrefPaperPosition.RIGHT)
		.calculateScore(0, 0);
		it('PrefPaper processFollowing 2 should work properly', () => {
			expect(paper2.mini).to.deep.equal(mini2);
		});

		it('PrefPaper addLeftSupa should throw', () => {
			expect(() => new PrefPaper('cope', 60)
			.processFollowing(follower2, 10, true, PrefPaperPosition.MIDDLE)).to.throw();
		});

		const follower3 = new PrefPaperFollower('mitko', true, 3, true);
		const mini3 = { score: -670, username: 'cope', left: 30, middle: 70, right: 0, refas: 2, unusedRefas: 2 };
		const paper3 = new PrefPaper('cope', 60, 2)
		.processFollowing(follower3, 10, true, PrefPaperPosition.LEFT)
		.calculateScore(0, 0);
		it('PrefPaper processFollowing 3 should work properly', () => {
			expect(paper3.mini).to.deep.equal(mini3);
		});

		const follower4 = new PrefPaperFollower('mitko', true, 3, true);
		const mini4 = { score: -670, username: 'cope', left: 0, middle: 70, right: 30, refas: 2, unusedRefas: 2 };
		const paper4 = new PrefPaper('cope', 60, 2)
		.processFollowing(follower4, 10, true, PrefPaperPosition.RIGHT)
		.calculateScore(0, 0);
		it('PrefPaper processFollowing 4 should work properly', () => {
			expect(paper4.mini).to.deep.equal(mini4);
		});

		const follower5 = new PrefPaperFollower('mitko', false, 3);
		const follower5b = new PrefPaperFollower('milja', false, 2);
		const mini5 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2 };
		const paper5 = new PrefPaper('cope', 60, 2);
		paper5.processFollowing(follower5, 10, true, PrefPaperPosition.LEFT)
		.processFollowing(follower5b, 10, true, PrefPaperPosition.RIGHT)
		.calculateScore(0, 0);

		it('PrefPaper processFollowing 5 should work properly', () => {
			expect(paper5.mini).to.deep.equal(mini5);
		});

		const follower6 = new PrefPaperFollower('mitko', true, 3, true);
		const mini6 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2 };
		const paper6 = new PrefPaper('cope', 60, 2)
		.processFollowing(follower6, 10, true, PrefPaperPosition.LEFT, true)
		.calculateScore(0, 0);
		it('PrefPaper processFollowing 6 should work properly', () => {
			expect(paper6.mini).to.deep.equal(mini6);
		});

		const follower7 = new PrefPaperFollower('mitko', true, 3);
		const mini7 = { score: -600, username: 'cope', left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2 };
		const paper7 = new PrefPaper('cope', 60, 2)
		.processFollowing(follower7, 10, true, PrefPaperPosition.RIGHT, true)
		.calculateScore(0, 0);
		it('PrefPaper processFollowing 7 should work properly', () => {
			expect(paper7.mini).to.deep.equal(mini7);
		});

	});

	describe('PrefPaper json tests', () => {
		const follower = new PrefPaperFollower('mitko', true, 3);
		it('PrefPaper json should throw', () => {
			expect(() => new PrefPaper('cope', 60)
				.processFollowing(follower, 10, true, PrefPaperPosition.RIGHT)
					.json,
			).to.throw();
		});

		const main = new PrefPaperMain('cope', 6);
		const mainFailed = new PrefPaperMain('cope', 6, true);
		const failer = new PrefPaperFollower('milja', true, 1, true);
		const paper = new PrefPaper('cope', 60, 5)
		.addNewRefa()
		.addNewRefa()
		.processMain(main, 10)
		.processMain(mainFailed, 10)
		.processFollowing(follower, 10, true, PrefPaperPosition.RIGHT)
		.processMain(main, 12, true)
		.processFollowing(failer, 10, true, PrefPaperPosition.LEFT)
		.calculateScore(0, 0);
		const json =
			{
				score: -660,
				left: [10],
				middle:
					[
						60,
						{ left: 1, middle: 1, right: 1 },
						{ left: 0, middle: -1, right: 0 },
						50,
						60,
						{ value: 48, repealed: true },
						70,
					],
				right: [30],
				refas: 5,
				unusedRefas: 3,
				username: 'cope',
			};
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(paper.json).to.deep.equal(json);
		});
	});

});
