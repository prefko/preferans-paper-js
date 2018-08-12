#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperItem = require("./item");
const PrefPaperMiddleItem = require("./middle-item");

const clean = (a) => _.filter(a, (i) => !i.isInvalidated() && !i.isRefa());

const validPosition = (position) => position === "left" || position === "middle" || position === "right";

class PrefPaperPlayer {

	constructor(paper, username, bula, refe = 0) {
		if (!paper) {
			throw new Error("PrefPaperPlayer::constructor:Paper is not valid " + JSON.stringify(paper));
		}
		if (!username) {
			throw new Error("PrefPaperPlayer::constructor:Username is not valid " + username);
		}
		if (!bula) {
			throw new Error("PrefPaperPlayer::constructor:Bula is not valid " + bula);
		}

		this.paper = paper;
		this.username = username;
		this.bula = bula;
		this.refe = refe;

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

	setNeighbours(leftPlayer, rightPlayer) {
		this.leftPlayerUsername = leftPlayer;
		this.rightPlayerUsername = rightPlayer;
		return this;
	}

	getUsername() {
		return this.username;
	}

	calculateScore() {
		let leftPlayer = this.paper.getPlayerByUsername(this.leftPlayerUsername);
		let rightPlayer = this.paper.getPlayerByUsername(this.rightPlayerUsername);

		this.score = this.getLeftValue() + this.getRightValue() - (this.getMiddleValue() * 10) - leftPlayer.getRightValue() - rightPlayer.getLeftValue();
		return this;
	}

	getAvailableRefaID() {
		return _.findIndex(this.middle, (i) => i.isRefaAvailable("middle"));
	}

	markPlayedRefa(position, failed = false) {
		if (!validPosition(position)) {
			throw new Error("PrefPaperPlayer::markPlayedRefa:Invalid position " + position);
		}

		let index = this.getAvailableRefaID();
		if (index < 0) {
			throw new Error("PrefPaperPlayer::markPlayedRefa: " + _.upperFirst(_.toLower(position)) + " player does not have available refas " + JSON.stringify(this.middle));
		}

		this.middle[index].markPlayedRefa(position, failed);
		// this.middle.splice(index, 1, refa);

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

	getMiddleValue() {
		return _.tail(clean(this.middle)).getValue();
	}

	getLeftValue() {
		let last = _.tail(clean(this.left));
		return last ? last.getValue() : 0;
	}

	getRightValue() {
		let last = _.tail(clean(this.left));
		return last ? last.getValue() : 0;
	}

	getJSON() {
		return {
			username: this.username,
			score: this.score,
			refe: this.refe - this.usedRefe,
			left: this.left,
			middle: this.middle,
			right: this.right
		};
	}

}

module.exports = PrefPaperPlayer;
