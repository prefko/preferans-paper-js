const _ = require("lodash");
const expect = require("chai").expect;

const PrefPaper = require("../lib/paper");

describe("PrefPaper tests", function () {
	it("PrefPaper should exist", function () {
		expect(PrefPaper).to.exist;
	});
});
