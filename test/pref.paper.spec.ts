'use strict';

import PrefPaper from '../src/pref.paper';

describe('PrefPaper tests', () => {
	describe('PrefPaper classes constructors tests', () => {
		const rand = Math.ceil(Math.random() * 1000) * 2;
		it('constructors should work', () => {
			expect(() => new PrefPaper('p1', rand + 1)).toThrow();
			expect(() => new PrefPaper('p1', rand)).not.toThrow();
			expect(new PrefPaper('p1', rand)).toBeInstanceOf(Object);
			expect(new PrefPaper('p1', rand).designation).toBe('p1');
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
			expect(paper1.left).toBe(0);
			expect(paper1.middle).toBe(60);
			expect(paper1.right).toBe(0);
			expect(paper1.mini).toEqual(mini1);
			expect(paper1.hasUnplayedRefa()).toBe(false);
			expect(paper1.addNewRefa().hasUnplayedRefa()).toBe(true);
			expect(paper1.designation).toBe('p1');
		});

		const paper1b = new PrefPaper('p1', 60).reset();
		it('PrefPaper infinite refas after reset methods should work properly', () => {
			expect(paper1b.left).toBe(0);
			expect(paper1b.middle).toBe(60);
			expect(paper1b.right).toBe(0);
			expect(paper1b.mini).toEqual(mini1);
			expect(paper1b.hasUnplayedRefa()).toBe(false);
			expect(paper1b.addNewRefa().hasUnplayedRefa()).toBe(true);
		});

		const mini2 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper2 = new PrefPaper('p1', 60);
		it('PrefPaper methods should work properly', () => {
			expect(paper2.left).toBe(0);
			expect(paper2.middle).toBe(60);
			expect(paper2.right).toBe(0);
			expect(paper2.mini).toEqual(mini2);
			expect(paper2.hasUnplayedRefa()).toBe(false);
			expect(paper2.addNewRefa().hasUnplayedRefa()).toBe(true);
		});

		const paper2b = new PrefPaper('p1', 60).reset();
		it('PrefPaper after reset methods should work properly', () => {
			expect(paper2b.left).toBe(0);
			expect(paper2b.middle).toBe(60);
			expect(paper2b.right).toBe(0);
			expect(paper2b.mini).toEqual(mini2);
			expect(paper2b.hasUnplayedRefa()).toBe(false);
			expect(paper2b.addNewRefa().hasUnplayedRefa()).toBe(true);
		});

		const mini3 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper3 = new PrefPaper('p1', 60);
		it('PrefPaper methods should work properly', () => {
			expect(paper3.left).toBe(0);
			expect(paper3.middle).toBe(60);
			expect(paper3.right).toBe(0);
			expect(paper3.mini).toEqual(mini3);
		});

		const paper3b = new PrefPaper('p1', 60).reset();
		it('PrefPaper after reset methods should work properly', () => {
			expect(paper3b.left).toBe(0);
			expect(paper3b.middle).toBe(60);
			expect(paper3b.right).toBe(0);
			expect(paper3b.mini).toEqual(mini3);
		});
	});

	describe('PrefPaper addNewRefa tests', () => {
		const mini1 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper1 = new PrefPaper('p1', 60).addNewRefa();
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(paper1.mini).toEqual(mini1);
		});

		const mini2 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper2 = new PrefPaper('p1', 60).addNewRefa().addNewRefa();
		it('PrefPaper addNewRefa 2 should work properly', () => {
			expect(paper2.mini).toEqual(mini2);
		});

		it('PrefPaper addNewRefa should not throw', () => {
			expect(() => new PrefPaper('p1', 60).addNewRefa()).not.toThrow();
		});
	});

	describe('PrefPaper markPlayedRefa tests', () => {
		const mini = {designation: 'p1', left: 30, middle: 60, right: 0};
		const paper = new PrefPaper('p1', 60).addNewRefa().processAsFollower(10, 'p1', 3, false, 'p3');
		it('PrefPaper addNewRefa 1 should work properly', () => {
			expect(paper.mini).toEqual(mini);
		});
	});

	describe('PrefPaper add values tests', () => {
		const rand = Math.ceil(Math.random() * 1000) * 2;
		it('PrefPaper processAsMain should throw because of odd value', () => {
			expect(() => new PrefPaper('p1', 60).processAsMain(rand + 1, 'p1', false)).toThrow();
			expect(() => new PrefPaper('p1', 60).processAsMainRepealed(rand + 1, 'p1', false)).toThrow();
			expect(() => new PrefPaper('p1', 60).processAsMain(rand + 1, 'p1', true)).toThrow();
			expect(() => new PrefPaper('p1', 60).processAsMainRepealed(rand + 1, 'p1', true)).toThrow();
		});
		it('PrefPaper processAsMain should throw because of designation', () => {
			expect(() => new PrefPaper('p3', 60).processAsMain(10, 'p1', false)).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsMainRepealed(10, 'p1', false)).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p1', 3, false, 'p3')).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsFollowerRepealed(10, 'p1', 3, false, 'p3')).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsMain(10, 'p1', true)).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsMainRepealed(10, 'p1', true)).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p1', 1, true, 'p3')).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsFollowerRepealed(10, 'p1', 1, true, 'p3')).toThrow();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p3', 1, true, 'p3')).toThrow();
		});
		it('PrefPaper processAsMain should not throw because of designation', () => {
			expect(() => new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p2')).not.toThrow();
			expect(() => new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p3')).not.toThrow();
			expect(() => new PrefPaper('p2', 60).processAsFollower(10, 'p2', 3, false, 'p1')).not.toThrow();
			expect(() => new PrefPaper('p2', 60).processAsFollower(10, 'p2', 3, false, 'p3')).not.toThrow();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p3', 3, false, 'p1')).not.toThrow();
			expect(() => new PrefPaper('p3', 60).processAsFollower(10, 'p3', 3, false, 'p2')).not.toThrow();
		});
	});

	describe('PrefPaper mini tests', () => {
		it('PrefPaper json should not throw 1', () => {
			expect(() => new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p2').mini).not.toThrow();
		});

		const mini1 = {designation: 'p1', left: 30, middle: 60, right: 0};
		const paper1 = new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p3');
		it('PrefPaper processFollower 1 should work properly', () => {
			expect(paper1.mini).toEqual(mini1);
		});

		const mini2 = {designation: 'p1', left: 0, middle: 60, right: 30};
		const paper2 = new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p2');
		it('PrefPaper processFollower 2 should work properly', () => {
			expect(paper2.mini).toEqual(mini2);
		});

		const mini3 = {designation: 'p1', left: 30, middle: 70, right: 0};
		const paper3 = new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, true, 'p3');
		it('PrefPaper processFollower 3 should work properly', () => {
			expect(paper3.mini).toEqual(mini3);
		});

		const mini4 = {designation: 'p1', left: 0, middle: 70, right: 30};
		const paper4 = new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, true, 'p2');
		it('PrefPaper processFollower 4 should work properly', () => {
			expect(paper4.mini).toEqual(mini4);
		});

		const mini5 = {designation: 'p1', left: 30, middle: 60, right: 20};
		const paper5 = new PrefPaper('p1', 60);
		paper5.processAsFollower(10, 'p1', 3, false, 'p3').processAsFollower(10, 'p1', 2, false, 'p2');

		it('PrefPaper processFollower 5 should work properly', () => {
			expect(paper5.mini).toEqual(mini5);
		});

		const mini6 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper6 = new PrefPaper('p1', 60).processAsFollowerRepealed(10, 'p1', 3, true, 'p3');
		it('PrefPaper processFollower 6 should work properly', () => {
			expect(paper6.mini).toEqual(mini6);
		});

		const mini7 = {designation: 'p1', left: 0, middle: 60, right: 0};
		const paper7 = new PrefPaper('p1', 60).processAsFollowerRepealed(10, 'p1', 3, false, 'p2');
		it('PrefPaper processFollower 7 should work properly', () => {
			expect(paper7.mini).toEqual(mini7);
		});
	});

	describe('PrefPaper json tests', () => {
		it('PrefPaper json should not throw 2', () => {
			expect(() => new PrefPaper('p1', 60).processAsFollower(10, 'p1', 3, false, 'p2').json).not.toThrow();
		});

		const paper = new PrefPaper('p1', 60)
			.addNewRefa()
			.addNewRefa()
			.processAsMain(10, 'p1', false)
			.processAsMain(10, 'p1', true)
			.processAsFollower(10, 'p1', 3, false, 'p2')
			.processAsMainRepealed(12, 'p1', false)
			.processAsFollower(10, 'p1', 1, true, 'p3');
		const json = {
			designation: 'p1',
			left: [10],
			middle: [60, {left: 0, middle: 1, right: 0}, {left: 0, middle: -1, right: 0}, 50, 60, {value: 48, repealed: true}, 70],
			right: [30]
		};
		it('PrefPaper lots of stuff work properly', () => {
			expect(paper.json).toEqual(json);
		});
	});
});
