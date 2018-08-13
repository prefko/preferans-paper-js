#!/usr/bin/env node
"use strict";

const PrefPaperColumn = require("./column");

class PrefPaperPlayer {

	constructor(username, bula) {
		if (!username) {
			throw new Error("PrefPaperPlayer::constructor:Username is not valid " + username);
		}
		if (!bula) {
			throw new Error("PrefPaperPlayer::constructor:Bula is not valid " + bula);
		}

		this.username = username;
		this.bula = bula;

		this.reset();
		return this;
	}

	processFollower(data, value, invalidated, mainPosition) {
		let {followed, tricks, failed} = data;
		if (followed) {
			switch (mainPosition) {
				case "left":
					this.addLeftValue(value * tricks, invalidated);
					break;
				case "right":
					this.addRightValue(value * tricks, invalidated);
					break;
				default:
					throw new Error("PrefPaperPlayer::processFollower:Invalid position " + mainPosition);
			}
			if (failed) {
				this.addMiddleValue(value, invalidated);
			}
		}
	}

	reset() {
		this.score = this.bula * 10;
		this.left = new PrefPaperColumn();
		this.middle = new PrefPaperColumn(this.bula, true);
		this.right = new PrefPaperColumn();
		return this;
	}

	hasUnplayedRefa() {
		return this.middle.getUnplayedRefasCount() > 0;
	}

	markLeftPlayedRefa(failed = false) {
		this.middle.markPlayedRefa("left", failed);
		return this;
	}

	markMiddlePlayedRefa(failed = false) {
		this.middle.markPlayedRefa("middle", failed);
		return this;
	}

	markRightPlayedRefa(failed = false) {
		this.middle.markPlayedRefa("right", failed);
		return this;
	}

	newRefa() {
		this.middle.addRefa();
		return this;
	}

	addLeftValue(value, invalidated = false) {
		this.left.addValue(value, invalidated);
		return this;
	}

	addMiddleValue(value, invalidated = false) {
		this.middle.addValue(value, invalidated);
		return this;
	}

	addRightValue(value, invalidated = false) {
		this.right.addValue(value, invalidated);
		return this;
	}

	calculateScore(leftValue = 0, rightValue = 0) {
		this.score = this.getLeftValue() + this.getRightValue() - (this.getMiddleValue() * 10) - leftValue - rightValue;
		return this;
	}

	getLeftValue() {
		return this.left.getValue();
	}

	getMiddleValue() {
		return this.middle.getValue();
	}

	getRightValue() {
		return this.right.getValue();
	}

	getJSON() {
		return {
			username: this.username,
			score: this.score,
			refe: this.middle.getUnplayedRefasCount(),
			left: this.left.getJSON(),
			middle: this.middle.getJSON(),
			right: this.right.getJSON()
		};
	}

}

module.exports = PrefPaperPlayer;
