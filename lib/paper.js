#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperPlayer = require("./player");

let DEFAULT_OPTIONS = Object.freeze({
	unlimitedRefe: false,
	playPikOnRefa: false,
	lastHandDoubleFall: false,
	lastHandLimitSoup: false,
	failPikAfterRefas: false,
	failPikAfterOneUnderZero: false,
	allowSubAndMortKontras: false
});

class PrefPaper {

	constructor(bula, refe = 0, options = DEFAULT_OPTIONS) {
		if (!bula) {
			throw new Error("No bula defined", bula);
		}

		this.bula = bula;
		this.refe = refe;
		this.options = _.clone(options);

		this.p1 = new PrefPaperPlayer(this.options.p1 || "p1", this.bula, this.refe, this.options);
		this.p2 = new PrefPaperPlayer(this.options.p1 || "p2", this.bula, this.refe, this.options);
		this.p3 = new PrefPaperPlayer(this.options.p1 || "p3", this.bula, this.refe, this.options);

		return this;
	}

	addHand(hand) {
		// TODO

		return this;
	}

	invalidateHand(id) {
		// TODO

		return this;
	}

	recalculate() {
		// TODO

		return this;
	}

	getPaperJSON() {
		return {
			// TODO
		};
	}

}

module.exports = PrefPaper;
