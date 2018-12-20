#!/usr/bin/env node
"use strict";

import {PrefPaperPosition} from './prefPaperEnums';

import PrefPaperColumn from './prefPaperColumn';
import PrefPaperFollower from './prefPaperFollower';

export default class PrefPaper {
	private _username: string;
	private _bula: number;
	private _left: PrefPaperColumn;
	private _middle: PrefPaperColumn;
	private _right: PrefPaperColumn;

	constructor(username: string, bula: number) {
		this._username = username;
		this._bula = bula;

		this._left = new PrefPaperColumn();
		this._middle = new PrefPaperColumn(bula, true);
		this._right = new PrefPaperColumn();
	}

	processMyFollowing(data: any) {
		let {followed, tricks, failed, value, mainPosition, invalidated} = data;
		if (followed) {
			this.addValue(mainPosition, value * tricks, invalidated);
			if (failed) this.addMiddleValue(value, invalidated);
		}
		return this;
	}

	reset() {
		// this.score = -this.bula * 10;
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
