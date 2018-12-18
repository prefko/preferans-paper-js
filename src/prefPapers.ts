#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import * as Ajv from 'ajv';
import PrefPapersHand from './prefPapersHand';
import PrefPapersPaper from './prefPapersPaper';

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
	private _hands: Map<number, PrefPapersHand>;

	constructor(bula: number, refe = 0, name1 = "p1", name2 = "p2", name3 = "p3") {
		this._hands = new Map<number, PrefPapersHand>();
		this._bula = bula;
		this._refe = refe;
		this._usedRefe = 0;

		this._p1 = new PrefPapersPaper(name1, bula);
		this._p2 = new PrefPapersPaper(name2, bula);
		this._p3 = new PrefPapersPaper(name3, bula);
	}

	get handCount(): number {
		return _.size(this._hands);
	}

	// TODO...
	getPlayerByUsername(username: string) {
		let id = _.findKey(this, (attr) => attr.username === username);
		if (id) return _.get(this, id);
		throw new Error("PrefPapers::getPlayerByUsername:Player not found for username " + username);
	}

	static isValidHand(hand: any): boolean {
		let {main = {}, left = {}, right = {}} = hand;
		return _validHand(hand) && _validTricks(main, left, right) && !_invalidFails(main, left, right);
	}

	addHand(hand: PrefPapersHand): PrefPapers {
		let id = _.size(this._hands) + 1;
		this._hands.set(id, hand);
		return this.processHand(hand);
	}

	changeHand(id: number, hand: PrefPapersHand): PrefPapers {
		let index = _.findIndex(this._hands, {id});
		if (!this._hands[index]) throw new Error("PrefPapers::changeHand:Hand not found with id " + id);
		if (!PrefPapers.isValidHand(hand)) throw new Error("PrefPapers::changeHand:Hand is not valid " + JSON.stringify(hand));

		hand.original = _.clone(this._hands[index]);
		this._hands[index] = hand;
		this._hands[index].id = id;

		return this.recalculate();
	}

	invalidateHand(id: number): PrefPapers {
		let index = _.findIndex(this._hands, {id});
		if (!this._hands[index]) throw new Error("PrefPapers::invalidateHand:Hand not found with id " + id);
		this._hands[index].invalidated = true;
		return this.recalculate();
	}

	recalculate(): PrefPapers {
		this._usedRefe = 0;
		this._p1.reset();
		this._p2.reset();
		this._p3.reset();

		for (let hand of this._hands) this.processHand(hand);
		return this;
	}

	processHand(hand: PrefPapersHand) {
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
