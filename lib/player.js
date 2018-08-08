#!/usr/bin/env node
"use strict";

const _ = require("lodash");

class PrefPaperPlayer {
	constructor(username, bula, refe = 0, options = {}) {
		if (!username) {
			throw new Error("No name defined", username);
		}
		else if (!bula) {
			throw new Error("No bula defined", bula);
		}

		this.username = username;
		this.bula = bula;
		this.refe = refe;
		this.options = _.clone(options);

		this.usedRefe = 0;
		this.left = [];
		this.middle = [bula];
		this.right = [];

		return this;
	}

	reset() {
		this.usedRefe = 0;
		this.left = [];
		this.middle = [this.bula];
		this.right = [];

		return this;
	}

	calculateScore(left, right) {
		// TODO

		return this;
	}

	getPlayerJSON() {
		return {
			// TODO include current score
		};
	}

}

module.exports = PrefPaperPlayer;
