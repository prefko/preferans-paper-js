const _ = require('lodash');
const expect = require('chai').expect;

let Paper = require('../lib/paper');

describe('Paper tests', function () {
	it('Paper should exist', function () {
		expect(Paper).to.exist;
	});
});