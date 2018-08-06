#!/usr/bin/env node
'use strict';

const _ = require('lodash');
const PrefPaperPlayer = require('./player');

let preferansOptions = {
	unlimitedRefe: false,
	playPikOnRefa: false,
	lastHandDoubleFall: false,
	lastHandLimitSoup: false,
	failPikAfterRefas: false,
	failPikAfterOneUnderZero: false,
	allowSubAndMortKontras: false
};

class PrefPaper {
	constructor(config = {}) {

	}
}

module.exports = PrefPaper;
module.exports.PrefPaperPlayer = PrefPaperPlayer;
