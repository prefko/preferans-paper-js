import {expect} from 'chai';

import {PrefPaperPosition} from "../src/prefPaperEnums";

describe("PrefPaper enums tests", () => {

	describe("PrefPaperPosition tests", () => {
		it("PrefPaperPositions exist", () => {
			expect(PrefPaperPosition.LEFT).to.exist;
			expect(PrefPaperPosition.MIDDLE).to.exist;
			expect(PrefPaperPosition.RIGHT).to.exist;
		});
	});

});
