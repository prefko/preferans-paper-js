#!/usr/bin/env node
'use strict';

import {expect} from 'chai';
import PrefPaper from '../src/prefPaper';

describe('PrefPaper tests', () => {

	describe('PrefPaper classes constructors tests', () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it('constructors should work', () => {
			expect(() => new PrefPaper('p1', rand + 1)).to.throw();
			expect(() => new PrefPaper('p1', rand)).to.not.throw();
			expect(new PrefPaper('p1', rand)).to.be.an('object');
			expect(new PrefPaper('p1', rand).designation).to.equal('p1');
		});
	});

	describe('PrefPaper method tests', () => {
		const mini1 = {
			designation: 'p1',
			left: 0,
			middle: 60,
			right: 0
		};
		const paper1 = new PrefPaper('p1', 60);
		it('PrefPaper infinite refas methods should work properly', () => {
			expect(paper1.left).to.equal(0);
			expect(paper1.middle).to.deep.equal(60);
			expect(paper1.right).to.equal(0);
			expect(paper1.mini).to.deep.equal(mini1);
			expect(paper1.hasUnplayedRefa()).to.equal(false);
			expect(paper1.addNewRefa().hasUnplayedRefa()).to.equal(true);
			expect(paper1.designation).to.equal('p1');
		});

		const paper1b = new PrefPaper('p1', 60).reset();
		it('PrefPaper infinite refas after reset methods should work properly', () => {
			expect(paper1b.left).to.equal(0);
			expect(paper1b.middle).to.deep.equal(60);
			expect(paper1b.right).to.equal(0);
			expect(paper1b.mini).to.deep.equal(mini1);
			expect(paper1b.hasUnplayedRefa()).to.equal(false);
			expect(paper1b.addNewRefa().hasUnplayedRefa()).to.equal(true);
		});

		const mini2 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper2 = new PrefPaper('p1', 60);
		it('PrefPaper methods should work properly', () => {
			expect(paper2.left).to.equal(0);
			expect(paper2.middle).to.deep.equal(60);
			expect(paper2.right).to.equal(0);
			expect(paper2.mini).to.deep.equal(mini2);
			expect(paper2.hasUnplayedRefa()).to.equal(false);
			expect(paper2.addNewRefa().hasUnplayedRefa()).to.equal(true);
		});

		const paper2b = new PrefPaper('p1', 60).reset();
		it('PrefPaper after reset methods should work properly', () => {
			expect(paper2b.left).to.equal(0);
			expect(paper2b.middle).to.deep.equal(60);
			expect(paper2b.right).to.equal(0);
			expect(paper2b.mini).to.deep.equal(mini2);
			expect(paper2b.hasUnplayedRefa()).to.equal(false);
			expect(paper2b.addNewRefa().hasUnplayedRefa()).to.equal(true);
		});

		const mini3 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper3 = new PrefPaper('p1', 60);
		it('PrefPaper methods should work properly', () => {
			expect(paper3.left).to.equal(0);
			expect(paper3.middle).to.deep.equal(60);
			expect(paper3.right).to.equal(0);
			expect(paper3.mini).to.deep.equal(mini3);
		});

		const paper3b = new PrefPaper('p1', 60).reset();
		it('PrefPaper after reset methods should work properly', () => {
			expect(paper3b.left).to.equal(0);
			expect(paper3b.middle).to.deep.equal(60);
			expect(paper3b.right).to.equal(0);
			expect(paper3b.mini).to.deep.equal(mini3);
		});
	});

	describe('PrefPaper addNewRefa tests', () => {
		const mini1 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper1 = new PrefPaper('p1', 60).addNewRefa();
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(paper1.mini).to.deep.equal(mini1);
		});

		const mini2 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper2 = new PrefPaper('p1', 60).addNewRefa().addNewRefa();
		it('PrefPaper addNewRefa 2 should work properly', () => {
			expect(paper2.mini).to.deep.equal(mini2);
		});

		it('PrefPaper addNewRefa should not throw', () => {
			expect(() => new PrefPaper('p1', 60).addNewRefa()).to.not.throw();
		});
	});

	describe('PrefPaper markPlayedRefa tests', () => {
		const mini = {designation: 'p1', left: 30, middle: 60, right: 0};
		const paper = new PrefPaper('p1', 60)
			.addNewRefa()
			.processAsFollower(10, 'p1', 3, false, 'p3');
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(paper.mini).to.deep.equal(mini);
		});
	});

	describe('PrefPaper add values tests', () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it('PrefPaper processAsMain should throw because of odd value', () => {
			expect(() => new PrefPaper('p1', 60).processAsMain(rand + 1, 'p1', false)).to.throw();
			expect(() => new PrefPaper('p1', 60).processAsMainRepealed(rand + 1, 'p1', false)).to.throw();
			expect(() => new PrefPaper('p1', 60).processAsMain(rand + 1, 'p1', true)).to.throw();
			expect(() => new PrefPaper('p1', 60).processAsMainRepealed(rand + 1, 'p1', true)).to.throw();
		});
		it('PrefPaper processAsMain should throw because of designation', () => {
			expect(() => new PrefPaper('p3', 60).processAsMain(10, 'p1', false)).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsMainRepealed(10, 'p1', false)).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p1', 3, false, 'p3')).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsFollowerRepealed(10, 'p1', 3, false, 'p3')).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsMain(10, 'p1', true)).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsMainRepealed(10, 'p1', true)).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p1', 1, true, 'p3')).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsFollowerRepealed(10, 'p1', 1, true, 'p3')).to.throw();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p3', 1, true, 'p3')).to.throw();
		});
		it('PrefPaper processAsMain should not throw because of designation', () => {
			expect(() => new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p2')).to.not.throw();
			expect(() => new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p3')).to.not.throw();
			expect(() => new PrefPaper('p2', 60).processAsFollower(10, 'p2', 3, false, 'p1')).to.not.throw();
			expect(() => new PrefPaper('p2', 60).processAsFollower(10, 'p2', 3, false, 'p3')).to.not.throw();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p3', 3, false, 'p1')).to.not.throw();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p3', 3, false, 'p2')).to.not.throw();
		});
	});

	describe('PrefPaper mini tests', () => {
		it('PrefPaper json should not throw 1', () => {
			expect(() => new PrefPaper('p1', 60)
				.processAsFollower(10, 'p1', 3, false, 'p2')
				.mini,
			).to.not.throw();
		});

		const mini1 = {designation: 'p1', left: 30, middle: 60, right: 0};
		const paper1 = new PrefPaper('p1', 60)
			.processAsFollower(10, 'p1', 3, false, 'p3');
		it('PrefPaper processFollower 1 should work properly', () => {
			expect(paper1.mini).to.deep.equal(mini1);
		});

		const mini2 = {designation: 'p1', left: 0, middle: 60, right: 30};
		const paper2 = new PrefPaper('p1', 60)
			.processAsFollower(10, 'p1', 3, false, 'p2');
		it('PrefPaper processFollower 2 should work properly', () => {
			expect(paper2.mini).to.deep.equal(mini2);
		});

		const mini3 = {designation: 'p1', left: 30, middle: 70, right: 0};
		const paper3 = new PrefPaper('p1', 60)
			.processAsFollower(10, 'p1', 3, true, 'p3');
		it('PrefPaper processFollower 3 should work properly', () => {
			expect(paper3.mini).to.deep.equal(mini3);
		});

		const mini4 = {designation: 'p1', left: 0, middle: 70, right: 30};
		const paper4 = new PrefPaper('p1', 60)
			.processAsFollower(10, 'p1', 3, true, 'p2');
		it('PrefPaper processFollower 4 should work properly', () => {
			expect(paper4.mini).to.deep.equal(mini4);
		});

		const mini5 = {designation: 'p1', left: 30, middle: 60, right: 20};
		const paper5 = new PrefPaper('p1', 60);
		paper5
			.processAsFollower(10, 'p1', 3, false, 'p3')
			.processAsFollower(10, 'p1', 2, false, 'p2');

		it('PrefPaper processFollower 5 should work properly', () => {
			expect(paper5.mini).to.deep.equal(mini5);
		});

		const mini6 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper6 = new PrefPaper('p1', 60)
			.processAsFollowerRepealed(10, 'p1', 3, true, 'p3');
		it('PrefPaper processFollower 6 should work properly', () => {
			expect(paper6.mini).to.deep.equal(mini6);
		});

		const mini7 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper7 = new PrefPaper('p1', 60)
			.processAsFollowerRepealed(10, 'p1', 3, false, 'p2');
		it('PrefPaper processFollower 7 should work properly', () => {
			expect(paper7.mini).to.deep.equal(mini7);
		});
	});

	describe('PrefPaper json tests', () => {
		it('PrefPaper json should not throw 2', () => {
			expect(() => new PrefPaper('p1', 60)
				.processAsFollower(10, 'p1', 3, false, 'p2')
				.json,
			).to.not.throw();
		});

		const paper = new PrefPaper('p1', 60)
			.addNewRefa()
			.addNewRefa()
			.processAsMain(10, 'p1', false)
			.processAsMain(10, 'p1', true)
			.processAsFollower(10, 'p1', 3, false, 'p2')
			.processAsMainRepealed(12, 'p1', false)
			.processAsFollower(10, 'p1', 1, true, 'p3')
		;

		const json = {
			designation: 'p1',
			left: [10],
			middle:
				[
					60,
					{left: 0, middle: 1, right: 0},
					{left: 0, middle: -1, right: 0},
					50,
					60,
					{value: 48, repealed: true},
					70,
				],
			right: [30]
		};
		it('PrefPaper lots of stuff work properly', () => {
			expect(paper.json).to.deep.equal(json);
		});
	});

});
