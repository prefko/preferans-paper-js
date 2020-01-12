#!/usr/bin/env node
'use strict';

import { expect } from 'chai';
import PrefPaperColumnMiddle from '../src/prefPaperColumnMiddle';
import { PrefPaperPosition } from '../src/prefPaper.enums';

describe('PrefPaperColumnMiddle tests', () => {

	describe('PrefPaperColumnMiddle classes constructors tests', () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it('constructors should work', () => {
			expect(() => new PrefPaperColumnMiddle(rand + 1)).to.throw();
			expect(() => new PrefPaperColumnMiddle(rand)).to.not.throw();
			expect(new PrefPaperColumnMiddle(60)).to.be.an('object');
		});
	});

	describe('PrefPaperColumnMiddle method tests', () => {
		const column1 = new PrefPaperColumnMiddle(60);
		it('PrefPaperColumnMiddle methods should work properly', () => {
			expect(column1.value).to.equal(60);
			expect(column1.json).to.deep.equal([60]);
			expect(column1.hasOpenRefa()).to.equal(false);
		});
	});

	describe('PrefPaperColumnMiddle addValue tests', () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it('PrefPaperColumnMiddle addValue should throw', () => {
			expect(() => new PrefPaperColumnMiddle(60).addValue(rand + 1)).to.throw();
		});

		const column2 = new PrefPaperColumnMiddle(60).addValue(10).addValue(-10);
		it('PrefPaperColumnMiddle addValue should work properly', () => {
			expect(column2.value).to.equal(60);
			expect(column2.json).to.deep.equal([60, 70, 60]);
		});

		const column3 = new PrefPaperColumnMiddle(60).addValue(10).addValueRepealed(-10);
		it('PrefPaperColumnMiddle addValue repealed should work properly', () => {
			expect(column3.value).to.equal(70);
			expect(column3.json).to.deep.equal([60, 70, { value: 60, repealed: true }]);
		});

		const column4 = new PrefPaperColumnMiddle(30).addValue(-30);
		it('PrefPaperColumnMiddle addValue to 0 should work properly', () => {
			expect(column4.value).to.equal(0);
			expect(column4.json).to.deep.equal([30, { hat: 1 }]);
		});

		const column5 = new PrefPaperColumnMiddle(30).addValue(-40);
		it('PrefPaperColumnMiddle addValue below 0 should work properly', () => {
			expect(column5.value).to.equal(-10);
			expect(column5.json).to.deep.equal([30, { hat: 1 }, -10]);
		});

		const column6 = new PrefPaperColumnMiddle(30).addValue(-40).addValue(10);
		it('PrefPaperColumnMiddle addValue below 0 back to 0 should work properly', () => {
			expect(column6.value).to.equal(0);
			expect(column6.json).to.deep.equal([30, { hat: 1 }, -10, { hat: -1 }]);
		});

		const column7 = new PrefPaperColumnMiddle(30).addValue(-40).addValue(20);
		it('PrefPaperColumnMiddle addValue below 0 back to 0 should work properly', () => {
			expect(column7.value).to.equal(10);
			expect(column7.json).to.deep.equal([30, { hat: 1 }, -10, { hat: -1 }, 10]);
		});
	});

	describe('PrefPaperColumnMiddle addRefa tests', () => {
		const column8 = new PrefPaperColumnMiddle(60).addRefa();
		it('PrefPaperColumnMiddle addRefa should work properly', () => {
			expect(column8.value).to.equal(60);
			expect(column8.json).to.deep.equal([60, { left: 0, middle: 0, right: 0 }]);
			expect(column8.hasOpenRefa()).to.equal(true);
		});
	});

	describe('PrefPaperColumnMiddle markPlayedRefa tests', () => {
		const column9 = new PrefPaperColumnMiddle(60).addValue(10).addValue(10)
		.addRefa().addValue(10)
		.markPlayedRefaPassed(PrefPaperPosition.LEFT);
		const column10 = new PrefPaperColumnMiddle(60).addValue(10)
		.addRefa().addValue(10)
		.markPlayedRefaFailed(PrefPaperPosition.MIDDLE);
		const column11 = new PrefPaperColumnMiddle(60).addValue(10).addValue(10).addValue(10)
		.addRefa().addValue(10)
		.markPlayedRefaFailed(PrefPaperPosition.RIGHT);
		it('PrefPaperColumnMiddle markPlayedRefa should work properly', () => {
			expect(() => column9.markPlayedRefaPassed(PrefPaperPosition.LEFT)).to.throw();
			expect(() => column9.markPlayedRefaFailed(PrefPaperPosition.LEFT)).to.throw();

			expect(column9.value).to.equal(90);
			expect(column9.json).to.deep.equal([60, 70, 80, { left: 1, middle: 0, right: 0 }, 90]);
			expect(column9.hasOpenRefa()).to.equal(true);

			expect(column10.value).to.equal(80);
			expect(column10.json).to.deep.equal([60, 70, { left: 0, middle: -1, right: 0 }, 80]);
			expect(column10.hasOpenRefa()).to.equal(false);

			expect(column11.value).to.equal(100);
			expect(column11.json).to.deep.equal([60, 70, 80, 90, { left: 0, middle: 0, right: -1 }, 100]);
			expect(column11.hasOpenRefa()).to.equal(true);
		});
	});

	describe('PrefPaperColumnMiddle reset tests', () => {
		const column12 = new PrefPaperColumnMiddle(60).addRefa().reset();
		it('PrefPaperColumnMiddle reset should work properly', () => {
			expect(column12.value).to.equal(60);
			expect(column12.json).to.deep.equal([60]);
		});
	});

});
