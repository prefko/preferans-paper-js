import {expect} from 'chai';

import PrefPaperColumnMiddle from "../src/prefPaperColumnMiddle";
import {PrefPaperPosition} from "../src/prefPaperEnums";

describe("PrefPaperColumnMiddle tests", () => {

	describe("PrefPaperColumnMiddle classes constructors tests", () => {
		let rand = Math.ceil((Math.random() * 1000)) * 2;
		it("constructors should work", () => {
			expect(() => new PrefPaperColumnMiddle(rand + 1)).to.throw();
			expect(() => new PrefPaperColumnMiddle(rand)).to.not.throw();
			expect(new PrefPaperColumnMiddle(60)).to.be.an("object");
		});
	});

	describe("PrefPaperColumnMiddle method tests", () => {
		let column1 = new PrefPaperColumnMiddle(60);
		it("PrefPaperColumnMiddle methods should should work properly", () => {
			expect(column1.value).to.be.equal(60);
			expect(column1.json).to.deep.equal([60]);
			expect(column1.hasUnplayedRefa()).to.equal(false);
			expect(column1.unplayedRefasCount).to.equal(0);
		});
	});

	describe("PrefPaperColumnMiddle addValue tests", () => {
		let rand = Math.ceil((Math.random() * 1000)) * 2;
		it("PrefPaperColumnMiddle addValue should throw", () => {
			expect(() => new PrefPaperColumnMiddle(60).addValue(rand + 1)).to.throw();
		});

		let column1 = new PrefPaperColumnMiddle(60).addValue(10).addValue(-10);
		it("PrefPaperColumnMiddle addValue should work properly", () => {
			expect(column1.value).to.be.equal(60);
			expect(column1.json).to.deep.equal([60, 70, 60]);
		});

		let column2 = new PrefPaperColumnMiddle(60).addValue(10).addValue(-10, true);
		it("PrefPaperColumnMiddle addValue repealed should work properly", () => {
			expect(column2.value).to.be.equal(70);
			expect(column2.json).to.deep.equal([60, 70, {value: 60, repealed: true}]);
		});

		let column3 = new PrefPaperColumnMiddle(30).addValue(-30);
		it("PrefPaperColumnMiddle addValue to 0 should work properly", () => {
			expect(column3.value).to.be.equal(0);
			expect(column3.json).to.deep.equal([30, {hat: 1}]);
		});

		let column4 = new PrefPaperColumnMiddle(30).addValue(-40);
		it("PrefPaperColumnMiddle addValue below 0 should work properly", () => {
			expect(column4.value).to.be.equal(-10);
			expect(column4.json).to.deep.equal([30, {hat: 1}, -10]);
		});

		let column5 = new PrefPaperColumnMiddle(30).addValue(-40).addValue(10);
		it("PrefPaperColumnMiddle addValue below 0 back to 0 should work properly", () => {
			expect(column5.value).to.be.equal(0);
			expect(column5.json).to.deep.equal([30, {hat: 1}, -10, {hat: -1}]);
		});

		let column6 = new PrefPaperColumnMiddle(30).addValue(-40).addValue(20);
		it("PrefPaperColumnMiddle addValue below 0 back to 0 should work properly", () => {
			expect(column6.value).to.be.equal(10);
			expect(column6.json).to.deep.equal([30, {hat: 1}, -10, {hat: -1}, 10]);
		});
	});

	describe("PrefPaperColumnMiddle addRefa tests", () => {
		let column1 = new PrefPaperColumnMiddle(60).addRefa();
		it("PrefPaperColumnMiddle addRefa should should work properly", () => {
			expect(column1.value).to.be.equal(60);
			expect(column1.json).to.deep.equal([60, {left: 0, middle: 0, right: 0}]);
			expect(column1.hasUnplayedRefa()).to.equal(true);
			expect(column1.unplayedRefasCount).to.equal(1);
		});
	});

	describe("PrefPaperColumnMiddle markPlayedRefa tests", () => {
		let column1 = new PrefPaperColumnMiddle(60).addValue(10).addValue(10)
			.addRefa().addValue(10)
			.markPlayedRefa(PrefPaperPosition.LEFT, true);
		let column2 = new PrefPaperColumnMiddle(60).addValue(10)
			.addRefa().addValue(10)
			.markPlayedRefa(PrefPaperPosition.MIDDLE, false);
		let column3 = new PrefPaperColumnMiddle(60).addValue(10).addValue(10).addValue(10)
			.addRefa().addValue(10)
			.markPlayedRefa(PrefPaperPosition.RIGHT, false);
		it("PrefPaperColumnMiddle markPlayedRefa should should work properly", () => {
			expect(() => new PrefPaperColumnMiddle(60).markPlayedRefa(PrefPaperPosition.LEFT, true)).to.throw();

			expect(column1.value).to.be.equal(90);
			expect(column1.json).to.deep.equal([60, 70, 80, {left: 1, middle: 0, right: 0}, 90]);
			expect(column1.hasUnplayedRefa()).to.equal(true);
			expect(column1.unplayedRefasCount).to.equal(1);

			expect(column2.value).to.be.equal(80);
			expect(column2.json).to.deep.equal([60, 70, {left: 0, middle: -1, right: 0}, 80]);
			expect(column2.hasUnplayedRefa()).to.equal(false);
			expect(column2.unplayedRefasCount).to.equal(0);

			expect(column3.value).to.be.equal(100);
			expect(column3.json).to.deep.equal([60, 70, 80, 90, {left: 0, middle: 0, right: -1}, 100]);
			expect(column3.hasUnplayedRefa()).to.equal(true);
			expect(column3.unplayedRefasCount).to.equal(1);
		});
	});

	describe("PrefPaperColumnMiddle reset tests", () => {
		let column1 = new PrefPaperColumnMiddle(60).addRefa().reset();
		it("PrefPaperColumnMiddle reset should should work properly", () => {
			expect(column1.value).to.be.equal(60);
			expect(column1.json).to.deep.equal([60]);
		});
	});

});
