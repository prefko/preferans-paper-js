#!/usr/bin/env node
"use strict";

const Ajv = require("ajv");
const PrefPaperColumn = require("./column");

const ajv = new Ajv({useDefaults: true});
const _validFollowerData = ajv.compile({
	type: "object",
	properties: {
		username: {type: "string"},
		followed: {type: "boolean", default: false},
		failed: {type: "boolean", default: false},
		tricks: {type: "integer", default: 0, minimum: 0, maximum: 5},
		value: {type: "integer", default: 0},
		mainPosition: {type: "string", enum: ["left", "right"]},
		invalidated: {type: "boolean", default: false}
	},
	required: ["followed", "failed", "tricks", "value", "mainPosition", "invalidated"],
	additionalProperties: false
});

class PrefPaperPlayer {

	constructor(username, bula) {
		if (!username) throw new Error("PrefPaperPlayer::constructor:Username is not valid " + username);
		if (!bula) throw new Error("PrefPaperPlayer::constructor:Bula is not valid " + bula);

		this.username = username;
		this.bula = bula;

		this.reset();
		return this;
	}

	processFailed(failed, value, invalidated) {
		if (failed) this.addMiddleValue(value, invalidated);
	}

	processMyFollowing(data = {}) {
		if (!_validFollowerData(data)) throw new Error("PrefPaperPlayer::processMyFollowing:Invalid data " + JSON.stringify(data));

		let {followed, tricks, failed, value, mainPosition, invalidated} = data;
		if (followed) {
			this.addValue(mainPosition, value * tricks, invalidated);
			this.processFailed(failed, value, invalidated);
		}
		return this;
	}

	reset() {
		this.score = -this.bula * 10;
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

	addValue(position, value, invalidated = false) {
		if ("left" === position) this.left.addValue(value, invalidated);
		if ("right" === position) this.right.addValue(value, invalidated);
		return this;
	}

	addMiddleValue(value, invalidated = false) {
		this.middle.addValue(value, invalidated);
		return this;
	}

	calculateScore(leftValue = 0, rightValue = 0) {
		let tmp = this.score;
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

	getMiniJSON() {
		return {
			username: this.username,
			score: this.score,
			left: this.left.getValue(),
			middle: this.middle.getValue(),
			right: this.right.getValue()
		};
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
