const _ = require('lodash');
const expect = require('chai').expect;

const PrefPaper = require('../lib/paper');
const PrefPaperPlayer = PrefPaper.PrefPaperPlayer;

describe('PrefPaperPlayer tests', function () {
	it('PrefPaperPlayer should exist', function () {
		expect(PrefPaperPlayer).to.exist;
	});
});