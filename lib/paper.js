#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperPlayer = require("./player");
const PrefPaperItem = require("./item");
const PrefPaperMiddleItem = require("../lib/middle-item");

class PrefPaper {

	constructor(bula, refe = 0, p1 = "p1", p2 = "p2", p3 = "p3") {
		if (!bula) {
			throw new Error("PrefPaper::constructor:No bula defined " + bula);
		}

		this.hands = [];
		this.bula = bula;
		this.refe = refe;

		this.usedRefe = 0;
		this.p1 = new PrefPaperPlayer(p1, this.bula, this.refe);
		this.p2 = new PrefPaperPlayer(p2, this.bula, this.refe);
		this.p3 = new PrefPaperPlayer(p3, this.bula, this.refe);

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
		this.hands.push(hand);
		// TODO: validate input attributes?
		return this.processHand(hand);
	}

	changeHand(index, hand) {
		if (!this.hands[index]) {
			throw new Error("PrefPaper::changeHand:Hand not found at index " + index);
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
			mainPlayer.markPlayedRefa("middle", main.failed);
			leftPlayer.markPlayedRefa("right", main.failed);
			rightPlayer.markPlayedRefa("left", main.failed);
		}

		mainPlayer.addMiddleValue(new PrefPaperMiddleItem(main.failed ? -value : value, invalidated));
		this.processLeftPlayer(leftPlayer, left, value, invalidated);
		this.processRightPlayer(rightPlayer, right, value, invalidated);

		mainPlayer.calculateScore(leftPlayer.getRightValue(), rightPlayer.getLeftValue());
		leftPlayer.calculateScore(rightPlayer.getRightValue(), mainPlayer.getLeftValue());
		rightPlayer.calculateScore(mainPlayer.getRightValue(), leftPlayer.getLeftValue());

		return this;
	}

	processNewRefa() {
		if (this.usedRefe < this.refe || this.refe <= 0) {
			this.usedRefe++;
			this.p1.addNewRefa(true);
			this.p2.addNewRefa(true);
			this.p3.addNewRefa(true);
		}
		return this;
	}

	processLeftPlayer(player, data, value, invalidated) {
		let {followed, tricks, failed} = data;
		if (followed) {
			player.addRightValue(new PrefPaperItem(value * tricks, invalidated));
			if (failed) {
				player.addMiddleValue(new PrefPaperMiddleItem(-value, invalidated));
			}
		}
	}

	processRightPlayer(player, data, value, invalidated) {
		let {followed, tricks, failed} = data;
		if (followed) {
			player.addLeftValue(new PrefPaperItem(value * tricks, invalidated));
			if (failed) {
				player.addMiddleValue(new PrefPaperMiddleItem(-value, invalidated));
			}
		}
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
