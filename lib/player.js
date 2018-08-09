#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperItem = require("./item");
const PrefPaperMiddleItem = require("./middle-item");

const clean = a => _.filter(a, i => !i.isUndone());

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
		this.middle = [new PrefPaperMiddleItem(this.bula)];
		this.right = [];
		return this;
	}

	calculateScore(leftPlayer, rightPlayer) {
		this.score = this.getLeftValue() + this.getRightValue() - (this.getMiddleValue() * 10) - leftPlayer.getRightValue() - rightPlayer.getLeftValue();
		return this;
	}

	addNewRefa() {
		this.right.push(new PrefPaperMiddleItem(true));
	}

	addLeftValue(value) {
		this.left.push(new PrefPaperItem(value));
	}

	addMiddleValue(value) {
		this.right.push(new PrefPaperMiddleItem(value));
	}

	addRightValue(value) {
		this.right.push(new PrefPaperItem(value));
	}

	getLeftValue() {
		let last = _.tail(clean(this.left));
		return last ? last.getValue() : 0;
	}

	getMiddleValue() {
		return _.tail(clean(this.middle)).getValue();
	}

	getRightValue() {
		let last = _.tail(clean(this.left));
		return last ? last.getValue() : 0;
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
