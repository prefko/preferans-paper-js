#!/usr/bin/env node
'use strict';

import { expect } from 'chai';
import { PrefPaperPosition } from '../src/prefPaper.enums';
import PrefPaperColumnSide from '../src/prefPaperColumnSide';

describe('PrefPaperColumnSide tests', () => {

	describe('PrefPaperColumnSide classes constructors tests', () => {
		it('constructors should work', () => {
			expect(() => new PrefPaperColumnSide(PrefPaperPosition.LEFT)).to.not.throw();
			expect(new PrefPaperColumnSide(PrefPaperPosition.LEFT)).to.be.an('object');
			expect(() => new PrefPaperColumnSide(PrefPaperPosition.MIDDLE)).to.not.throw();
			expect(new PrefPaperColumnSide(PrefPaperPosition.MIDDLE)).to.be.an('object');
			expect(() => new PrefPaperColumnSide(PrefPaperPosition.RIGHT)).to.not.throw();
			expect(new PrefPaperColumnSide(PrefPaperPosition.RIGHT)).to.be.an('object');
		});
	});

	describe('PrefPaperColumnSide method tests', () => {
		const column1 = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		const column2 = new PrefPaperColumnSide(PrefPaperPosition.MIDDLE);
		const column3 = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
		it('PrefPaperColumnSide methods should return proper values', () => {
			expect(column1.value).to.equal(0);
			expect(column1.json).to.deep.equal([]);
			expect(column2.value).to.equal(0);
			expect(column2.json).to.deep.equal([]);
			expect(column3.value).to.equal(0);
			expect(column3.json).to.deep.equal([]);
		});
	});

	describe('PrefPaperColumnSide reset tests', () => {
		const column1 = new PrefPaperColumnSide(PrefPaperPosition.LEFT).reset();
		const column2 = new PrefPaperColumnSide(PrefPaperPosition.MIDDLE).reset();
		const column3 = new PrefPaperColumnSide(PrefPaperPosition.RIGHT).reset();
		it('PrefPaperColumnSide reset should return proper values', () => {
			expect(column1.value).to.equal(0);
			expect(column1.json).to.deep.equal([]);
			expect(column2.value).to.equal(0);
			expect(column2.json).to.deep.equal([]);
			expect(column3.value).to.equal(0);
			expect(column3.json).to.deep.equal([]);
		});
	});

	describe('PrefPaperColumnSide addValue tests', () => {
		const column1 = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		column1.addValue(10).addValue(8).addValueRepealed(10).addValue(22);
		it('PrefPaperColumnSide addValue should return proper values', () => {
			expect(column1.value).to.equal(40);
			expect(column1.json).to.deep.equal([10, 18, { value: 28, repealed: true }, 40]);
		});
		it('PrefPaperColumnSide addValue should throw', () => {
			expect(() => new PrefPaperColumnSide(PrefPaperPosition.LEFT).addValue(-8)).to.throw();
		});
	});

	describe('PrefPaperColumnSide addValue reset tests', () => {
		const column1 = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		column1.addValue(10).addValue(8).addValueRepealed(16).addValue(10).reset();
		it('PrefPaperColumnSide reset should return proper values', () => {
			expect(column1.value).to.equal(0);
			expect(column1.json).to.deep.equal([]);
		});
	});

});
