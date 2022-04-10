'use strict';

import {expect} from 'chai';

import PrefPaperPosition from '../../src/enums/pref.paper.position';

describe('PrefPaperPosition tests', () => {
	/* tslint:disable:no-unused-expression */
	it('PrefPaperPositions exist', () => {
		expect(PrefPaperPosition.LEFT).to.exist;
		expect(PrefPaperPosition.MIDDLE).to.exist;
		expect(PrefPaperPosition.RIGHT).to.exist;
	});
	/* tslint:enable:no-unused-expression */
});
