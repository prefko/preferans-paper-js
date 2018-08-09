#!/usr/bin/env node
"use strict";

const _ = require("lodash");

class PrefPaperPlayer {

	constructor(username, bula, refe = 0, options = {}) {
		if (!username) {
			throw new Error("Username is not valid", username);
		}
		if (!bula) {
			throw new Error("Bula is not valid", bula);
		}

		this.username = username;
		this.bula = bula;
		this.refe = refe;
		this.options = _.clone(options);

		this.reset();

		return this;
	}

	reset() {
		this.score = this.bula * 10;
		this.usedRefe = 0;
		this.left = [];
		this.middle = [this.bula];
		this.right = [];
		return this;
	}

	calculateScore(leftPlayer, rightPlayer) {
		this.score = this.getLeft() + this.getRight() - (this.getMiddle() * 10) - leftPlayer.getRight() - rightPlayer.getLeft();
		return this;
	}

	getLeft() {
		return _.tail(this.left);
	}

	getMiddle() {
		return _.tail(this.middle);
	}

	getRight() {
		return _.tail(this.right);
	}

	getJSON() {
		return {
			score: this.score,
			refe: this.refe - this.usedRefe,
			left: this.left,
			middle: this.middle,
			right: this.right
		};
	}

}

module.exports = PrefPaperPlayer;
