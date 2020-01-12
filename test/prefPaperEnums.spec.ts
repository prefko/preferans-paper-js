#!/usr/bin/env node
'use strict';

import { expect } from 'chai';
import { PrefPaperPosition } from '../src/prefPaper.enums';

describe('PrefPaper enums tests', () => {

	/* tslint:disable:no-unused-expression */
	describe('PrefPaperPosition tests', () => {
		it('PrefPaperPositions exist', () => {
			expect(PrefPaperPosition.LEFT).to.exist;
			expect(PrefPaperPosition.MIDDLE).to.exist;
			expect(PrefPaperPosition.RIGHT).to.exist;
		});
	});
	/* tslint:enable:no-unused-expression */

});
