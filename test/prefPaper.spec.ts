#!/usr/bin/env node
"use strict";

import {expect} from 'chai';
import PrefPaper from "../src/prefPaper";

describe("PrefPaper tests", () => {

	describe("PrefPaper classes constructors tests", () => {
		const rand = Math.ceil((Math.random() * 1000)) * 2;
		it("constructors should work", () => {
			expect(() => new PrefPaper("cope", rand + 1)).to.throw();
			expect(() => new PrefPaper("cope", rand)).to.not.throw();
			expect(new PrefPaper("cope", rand)).to.be.an("object");
			expect(() => new PrefPaper("cope", rand + 1, 2)).to.throw();
			expect(() => new PrefPaper("cope", rand, 2)).to.not.throw();
			expect(new PrefPaper("cope", rand, 2)).to.be.an("object");
		});
	});

	describe("PrefPaper method tests", () => {
		const json1 = {username: "cope", left: 0, middle: 60, right: 0, refas: Infinity, unusedRefas: Infinity};
		const paper1 = new PrefPaper("cope", 60);
		it("PrefPaper infinite refas methods should should work properly", () => {
			expect(paper1.left).to.be.equal(0);
			expect(paper1.middle).to.deep.equal(60);
			expect(paper1.right).to.equal(0);
			expect(paper1.json).to.deep.equal(json1);
		});

		const paper1b = new PrefPaper("cope", 60).reset();
		it("PrefPaper infinite refas after reset methods should should work properly", () => {
			expect(paper1b.left).to.be.equal(0);
			expect(paper1b.middle).to.deep.equal(60);
			expect(paper1b.right).to.equal(0);
			expect(paper1b.json).to.deep.equal(json1);
		});

		const json2 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 2};
		const paper2 = new PrefPaper("cope", 60, 2);
		it("PrefPaper methods should should work properly", () => {
			expect(paper2.left).to.be.equal(0);
			expect(paper2.middle).to.deep.equal(60);
			expect(paper2.right).to.equal(0);
			expect(paper2.json).to.deep.equal(json2);
		});

		const paper2b = new PrefPaper("cope", 60, 2).reset();
		it("PrefPaper after reset methods should should work properly", () => {
			expect(paper2b.left).to.be.equal(0);
			expect(paper2b.middle).to.deep.equal(60);
			expect(paper2b.right).to.equal(0);
			expect(paper2b.json).to.deep.equal(json2);
		});

		const json3 = {username: "cope", left: 0, middle: 60, right: 0, refas: 0, unusedRefas: 0};
		const paper3 = new PrefPaper("cope", 60, 0);
		it("PrefPaper methods should should work properly", () => {
			expect(paper3.left).to.be.equal(0);
			expect(paper3.middle).to.deep.equal(60);
			expect(paper3.right).to.equal(0);
			expect(paper3.json).to.deep.equal(json3);
		});

		const paper3b = new PrefPaper("cope", 60, 0).reset();
		it("PrefPaper after reset methods should should work properly", () => {
			expect(paper3b.left).to.be.equal(0);
			expect(paper3b.middle).to.deep.equal(60);
			expect(paper3b.right).to.equal(0);
			expect(paper3b.json).to.deep.equal(json3);
		});
	});

	describe("PrefPaper method tests", () => {
		const json1 = {username: "cope", left: 0, middle: 60, right: 0, refas: 2, unusedRefas: 1};
		const paper1 = new PrefPaper("cope", 60, 2).addNewRefa();
		it("PrefPaper addNewRefa should should work properly", () => {
			expect(paper1.json).to.deep.equal(json1);
		});
	});

});
