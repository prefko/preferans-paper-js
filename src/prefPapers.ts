#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import * as Ajv from 'ajv';
import PrefPapersPaper from './prefPapersPaper';

const ajv = new Ajv({useDefaults: true});
const _validHand = ajv.compile({
	oneOf: [{
		type: "object",
		properties: {
			newRefa: {type: "boolean", enum: [true]},
			invalidated: {type: "boolean", default: false},
		},
		required: ["newRefa"],
		additionalProperties: false
	}, {
		type: "object",
		properties: {
			value: {type: "integer", minimum: 0},
			main: {
				type: "object",
				properties: {
					username: {type: "string"},
					failed: {type: "boolean", default: false}
				},
				required: ["username"],
				additionalProperties: false
			},
			left: {
				oneOf: [{
					type: "object",
					properties: {
						username: {type: "string"},
						followed: {type: "boolean", enum: [true]},
						tricks: {type: "integer", minimum: 0, maximum: 5},
						failed: {type: "boolean", default: false}
					},
					required: ["username", "followed", "tricks"],
					additionalProperties: false
				}, {
					type: "object",
					properties: {
						username: {type: "string"},
						failed: {type: "boolean", default: false}
					},
					required: ["username"],
					additionalProperties: false
				}]
			},
			right: {
				oneOf: [{
					type: "object",
					properties: {
						username: {type: "string"},
						followed: {type: "boolean", enum: [true]},
						tricks: {type: "integer", minimum: 0, maximum: 5},
						failed: {type: "boolean", default: false}
					},
					required: ["username", "followed", "tricks"],
					additionalProperties: false
				}, {
					type: "object",
					properties: {
						username: {type: "string"},
						failed: {type: "boolean", default: false}
					},
					required: ["username"],
					additionalProperties: false
				}]
			},
			invalidated: {type: "boolean", default: false},
		},
		required: ["value", "main", "left", "right"],
		additionalProperties: false
	}]
});
const _validTricks = (main, left, right): boolean => {
	let tricks = _.get(left, "tricks", 0) + _.get(right, "tricks", 0);
	return _.get(main, "failed", false) ? tricks === 5 : tricks < 5;
};
const _invalidFails = (main, left, right) => {
	return _.get(main, "failed", false) && (_.get(left, "failed", false) || _.get(right, "failed", false));
};

export default class PrefPapers {
	private _p1: PrefPapersPaper;
	private _p2: PrefPapersPaper;
	private _p3: PrefPapersPaper;
	private _bula: number;
	private _refe: number;
	private _usedRefe: number;
	private _hands: Array<number>;

	constructor(bula: number, refe = 0, name1 = "p1", name2 = "p2", name3 = "p3") {
		this._hands = [];
		this._bula = bula;
		this._refe = refe;
		this._usedRefe = 0;

		this._p1 = new PrefPapersPaper(name1, bula);
		this._p2 = new PrefPapersPaper(name2, bula);
		this._p3 = new PrefPapersPaper(name3, bula);
	}

	get handCount() {
		return _.size(this._hands);
	}

	getPlayerByUsername(username) {
		let id = _.findKey(this, (attr) => attr.username === username);
		if (id) return _.get(this, id);
		throw new Error("PrefPapers::getPlayerByUsername:Player not found for username " + username);
	}

	static isValidHand(hand = {}) {
		let {main = {}, left = {}, right = {}} = hand;
		return _validHand(hand) && _validTricks(main, left, right) && !_invalidFails(main, left, right);
	}

	addHand(hand) {
		if (!PrefPapers.isValidHand(hand)) throw new Error("PrefPapers::addHand:Hand is not valid " + JSON.stringify(hand));

		hand.id = _.size(this.hands) + 1;
		this.hands.push(hand);
		return this.processHand(hand);
	}

	changeHand(id, hand) {
		let index = _.findIndex(this.hands, {id});
		if (!this.hands[index]) throw new Error("PrefPapers::changeHand:Hand not found with id " + id);
		if (!PrefPapers.isValidHand(hand)) throw new Error("PrefPapers::changeHand:Hand is not valid " + JSON.stringify(hand));

		hand.original = _.clone(this.hands[index]);
		this.hands[index] = _.clone(hand);
		this.hands[index].id = id;

		return this.recalculate();
	}

	invalidateHand(id) {
		let index = _.findIndex(this.hands, {id});
		if (!this.hands[index]) throw new Error("PrefPapers::invalidateHand:Hand not found with id " + id);
		this.hands[index].invalidated = true;
		return this.recalculate();
	}

	recalculate() {
		this.usedRefe = 0;
		this.p1.reset();
		this.p2.reset();
		this.p3.reset();

		for (let hand of this.hands) this.processHand(hand);
		return this;
	}

	processHand(hand) {
		let {value, main = {}, left = {}, right = {}, newRefa = false, invalidated = false} = hand;
		main.failed = true === main.failed;

		if (newRefa) return this.processNewRefa();

		let mainPlayer = this.getPlayerByUsername(main.username);
		let leftPlayer = this.getPlayerByUsername(left.username);
		let rightPlayer = this.getPlayerByUsername(right.username);

		mainPlayer.markMiddlePlayedRefa(main.failed);
		leftPlayer.markRightPlayedRefa(main.failed);
		rightPlayer.markLeftPlayedRefa(main.failed);

		mainPlayer.addMiddleValue(main.failed ? value : -value, invalidated);
		leftPlayer.processMyFollowing(_.merge({}, left, {value, mainPosition: "right", invalidated}));
		leftPlayer.processMyFollowing(_.merge({}, right, {value, mainPosition: "left", invalidated}));

		mainPlayer.calculateScore(leftPlayer.getRightValue(), rightPlayer.getLeftValue());
		leftPlayer.calculateScore(rightPlayer.getRightValue(), mainPlayer.getLeftValue());
		rightPlayer.calculateScore(mainPlayer.getRightValue(), leftPlayer.getLeftValue());

		return this;
	}

	processNewRefa() {
		if (this.refe > 0 && this.usedRefe >= this.refe) throw new Error("PrefPapers::processNewRefa:All refas have been used " + this.refe);

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
