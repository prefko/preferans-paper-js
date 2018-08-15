#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const Ajv = require("ajv");
const PrefPaperPlayer = require("./player");

const ajv = new Ajv({useDefaults: true});
const _validHand = ajv.compile({
	type: "object",
	properties: {
		if: {properties: {newRefa: true}},
		then: {required: ["newRefa"]},
		else: {required: ["value", "main", "left", "right"]},
		value: {type: "integer", minimum: 0},
		main: {
			type: "object",
			properties: {
				username: {type: "string"},
				failed: {type: "boolean", default: false}
			},
			required: ["username"]
		},
		left: {
			type: "object",
			properties: {
				username: {type: "string"},
				followed: {type: "boolean", default: false},
				tricks: {type: "integer", default: 0},
				failed: {type: "boolean", default: false}
			},
			if: {properties: {followed: true}},
			then: {required: ["username", "tricks"]},
			else: {required: ["username"]}
		},
		right: {
			type: "object",
			properties: {
				username: {type: "string"},
				followed: {type: "boolean", default: false},
				tricks: {type: "integer", default: 0},
				failed: {type: "boolean", default: false}
			},
			if: {properties: {followed: true}},
			then: {required: ["username", "tricks"]},
			else: {required: ["username"]}
		},
		newRefa: {type: "boolean", default: false},
		invalidated: {type: "boolean", default: false}
	}
});
// const _validUsernames = (main, left, right) => _.isString(main.username) && _.isString(left.username) && _.isString(right.username);
// const _validObjects = (value, main, left, right) => _.isInteger(value) && _.isPlainObject(main) && _.isPlainObject(left) && _.isPlainObject(right);
// const _validBooleans = (newRefa, invalidated) => _.isBoolean(newRefa) && _.isBoolean(invalidated);
// const _invalidFollowers = (left, right) => (left.followed && !_.isInteger(left.tricks)) || (right.followed && !_.isInteger(right.tricks));
const _validTricks = (left, right) => left.tricks + right.tricks < 6;
const _invalidFails = (main, left, right) => main.failed && (left.failed || right.failed);

class PrefPaper {

	constructor(bula, refe = 0, p1 = "p1", p2 = "p2", p3 = "p3") {
		if (!bula) {
			throw new Error("PrefPaper::constructor:No bula defined " + bula);
		}

		this.hands = [];
		this.bula = bula;
		this.refe = refe;

		this.usedRefe = 0;
		this.p1 = new PrefPaperPlayer(p1, this.bula);
		this.p2 = new PrefPaperPlayer(p2, this.bula);
		this.p3 = new PrefPaperPlayer(p3, this.bula);

		return this;
	}

	getHandCount() {
		return _.size(this.hands);
	}

	getPlayerByUsername(username) {
		let id = _.findKey(this, (attr) => attr.username === username);
		if (id) {
			return _.get(this, id);
		}
		throw new Error("PrefPaper::getPlayerByUsername:Player not found for username " + username);
	}

	static isValidHand(hand = {}) {
		if (_validHand(hand)) {
			return true;
		}
		let {main = {}, left = {}, right = {}} = hand;
		// if (true === newRefa) {
		// 	return true;
		// }
		return _validTricks(left, right) &&
			!_invalidFails(main, left, right);
		// return _validUsernames(main, left, right) &&
		// 	_validObjects(value, main, left, right) &&
		// 	_validBooleans(newRefa, invalidated) &&
		// 	!_invalidFollowers(left, right) &&
		// 	_validTricks(left, right) &&
		// 	!_invalidFails(main, left, right);
	}

	addHand(hand) {
		if (!PrefPaper.isValidHand(hand)) {
			throw new Error("PrefPaper::addHand:Hand is not valid " + JSON.stringify(hand));
		}

		hand.id = _.size(this.hands) + 1;
		this.hands.push(hand);
		return this.processHand(hand);
	}

	changeHand(id, hand) {
		let index = _.findIndex(this.hands, {id: id});
		if (!this.hands[index]) {
			throw new Error("PrefPaper::changeHand:Hand not found with id " + id);
		}
		if (!PrefPaper.isValidHand(hand)) {
			throw new Error("PrefPaper::changeHand:Hand is not valid " + JSON.stringify(hand));
		}

		hand.original = _.clone(this.hands[index]);
		this.hands[index] = _.clone(hand);
		this.hands[index].id = id;

		return this.recalculate();
	}

	invalidateHand(id) {
		let index = _.findIndex(this.hands, {id: id});
		if (!this.hands[index]) {
			throw new Error("PrefPaper::invalidateHand:Hand not found with id " + id);
		}
		this.hands[index].invalidated = true;

		return this.recalculate();
	}

	recalculate() {
		this.usedRefe = 0;
		this.p1.reset();
		this.p2.reset();
		this.p3.reset();

		for (let hand of this.hands) {
			this.processHand(hand);
		}

		return this;
	}

	processHand(hand) {
		let {value, main = {}, left = {}, right = {}, newRefa = false, invalidated = false} = hand;
		main.failed = true === main.failed;

		if (newRefa) {
			return this.processNewRefa();
		}

		let mainPlayer = this.getPlayerByUsername(main.username);
		let leftPlayer = this.getPlayerByUsername(left.username);
		let rightPlayer = this.getPlayerByUsername(right.username);

		mainPlayer.markMiddlePlayedRefa(main.failed);
		leftPlayer.markRightPlayedRefa(main.failed);
		rightPlayer.markLeftPlayedRefa(main.failed);

		mainPlayer.addMiddleValue(main.failed ? value : -value, invalidated);
		leftPlayer.processMyFollowing(left, value, "right", invalidated);
		leftPlayer.processMyFollowing(right, value, "left", invalidated);

		mainPlayer.calculateScore(leftPlayer.getRightValue(), rightPlayer.getLeftValue());
		leftPlayer.calculateScore(rightPlayer.getRightValue(), mainPlayer.getLeftValue());
		rightPlayer.calculateScore(mainPlayer.getRightValue(), leftPlayer.getLeftValue());

		return this;
	}

	processNewRefa() {
		if (this.refe > 0 && this.usedRefe >= this.refe) {
			throw new Error("PrefPaper::processNewRefa:All refas have been used " + this.refe);
		}

		this.usedRefe++;
		this.p1.newRefa(true);
		this.p2.newRefa(true);
		this.p3.newRefa(true);

		return this;
	}

	getJSON() {
		return {
			p1: this.p1.getJSON(),
			p2: this.p2.getJSON(),
			p3: this.p3.getJSON()
		};
	}

}

module.exports = PrefPaper;
