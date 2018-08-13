#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperPlayer = require("./player");

const validHand = (hand) => {
	let {value, main, left, right, refa = false, newRefa = false, invalidated = false} = hand;
	let validUsernames = _.isString(main.username) && _.isString(left.username) && _.isString(right.username);
	let validObjects = _.isInteger(value) && _.isPlainObject(main) && _.isPlainObject(left) && _.isPlainObject(right);
	let validBooleans = _.isBoolean(refa) && _.isBoolean(newRefa) && _.isBoolean(invalidated);
	let invalidFollowers = (!!left.followed && !_.isInteger(left.tricks)) || (!!right.followed && !_.isInteger(right.tricks));
	let validTricks = ((left.tricks || 0) + (right.tricks || 0)) < 6;
	let invalidFails = !!main.failed && (!!left.failed || !!right.failed);

	return validObjects && validBooleans && validUsernames && validTricks && !invalidFollowers && !invalidFails;
};

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

	getPlayerByUsername(username) {
		let id = _.findKey(this, (attr) => attr.username === username);
		if (id) {
			return _.get(this, id);
		}
		throw new Error("PrefPaper::getPlayerByUsername:Player not found for username " + username);
	}

	addHand(hand) {
		if (!validHand(hand)) {
			throw new Error("PrefPaper::addHand:Hand is not valid " + JSON.stringify(hand));
		}

		this.hands.push(hand);
		return this.processHand(hand);
	}

	changeHand(index, hand) {
		if (!this.hands[index]) {
			throw new Error("PrefPaper::changeHand:Hand not found at index " + index);
		}
		if (!validHand(hand)) {
			throw new Error("PrefPaper::addHand:Hand is not valid " + JSON.stringify(hand));
		}

		hand.original = _.clone(this.hands[index]);
		this.hands[index] = hand;

		return this.recalculate();
	}

	invalidateHand(index) {
		if (!this.hands[index]) {
			throw new Error("PrefPaper::invalidateHand:Hand not found at index " + index);
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
		let {value, main, left, right, refa = false, newRefa = false, invalidated = false} = hand;

		if (newRefa) {
			return this.processNewRefa();
		}

		let mainPlayer = this.getPlayerByUsername(main.username);
		let leftPlayer = this.getPlayerByUsername(left.username);
		let rightPlayer = this.getPlayerByUsername(right.username);

		if (refa) {
			mainPlayer.markMiddlePlayedRefa(main.failed);
			leftPlayer.markRightPlayedRefa(main.failed);
			rightPlayer.markLeftPlayedRefa(main.failed);
		}

		mainPlayer.addMiddleValue(main.failed ? value : -value, invalidated);
		leftPlayer.processMyFollowing(left, value, "right", invalidated);
		leftPlayer.processMyFollowing(right, value, "left", invalidated);

		mainPlayer.calculateScore(leftPlayer.getRightValue(), rightPlayer.getLeftValue());
		leftPlayer.calculateScore(rightPlayer.getRightValue(), mainPlayer.getLeftValue());
		rightPlayer.calculateScore(mainPlayer.getRightValue(), leftPlayer.getLeftValue());

		return this;
	}

	processNewRefa() {
		if (this.usedRefe < this.refe || this.refe <= 0) {
			this.usedRefe++;
			this.p1.newRefa(true);
			this.p2.newRefa(true);
			this.p3.newRefa(true);
		}
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
