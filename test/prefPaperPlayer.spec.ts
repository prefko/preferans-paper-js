#!/usr/bin/env node
'use strict';

import {expect} from 'chai';
import PrefPaperPlayer from '../src/prefPaperPlayer';

describe('PrefPaperMain tests', () => {

	describe('PrefPaperMain classes constructors tests', () => {
		it('constructors should work', () => {
			expect(() => new PrefPaperPlayer('p1')).to.not.throw();
			expect(new PrefPaperPlayer('p1')).to.be.an('object');
			expect(() => new PrefPaperPlayer('p1', 2)).to.not.throw();
			expect(new PrefPaperPlayer('p1', 2)).to.be.an('object');
			expect(() => new PrefPaperPlayer('p1', 1, true)).to.not.throw();
			expect(new PrefPaperPlayer('p1', 1, true)).to.be.an('object');
		});
	});

	describe('PrefPaperMain methods tests', () => {
		const follower1 = new PrefPaperPlayer('p1', 3);
		it('PrefPaperMain methods should return proper values', () => {
			expect(follower1.designation).to.equal('p1');
			expect(follower1.tricks).to.equal(3);
			expect(follower1.failed).to.equal(false);
		});

		const follower2 = new PrefPaperPlayer('p1', 1, true);
		it('PrefPaperMain methods for failed should return proper values', () => {
			expect(follower2.designation).to.equal('p1');
			expect(follower2.tricks).to.equal(1);
			expect(follower2.failed).to.equal(true);
		});

		const follower3 = new PrefPaperPlayer('p1', 0);
		it('PrefPaperMain methods for not followed should return proper values', () => {
			expect(follower3.designation).to.equal('p1');
			expect(follower3.tricks).to.equal(0);
			expect(follower3.failed).to.equal(false);
		});

		const follower4 = new PrefPaperPlayer('p1', 0, true);
		it('PrefPaperMain methods for not followed and failed should return proper values', () => {
			expect(follower4.designation).to.equal('p1');
			expect(follower4.tricks).to.equal(0);
			expect(follower4.failed).to.equal(true);
		});
	});

});
