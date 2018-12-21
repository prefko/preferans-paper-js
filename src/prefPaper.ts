#!/usr/bin/env node
"use strict";

import {PrefPaperPosition} from './prefPaperEnums';

import PrefPaperColumn from './prefPaperColumn';
import PrefPaperColumnMiddle from './prefPaperColumnMiddle';
import PrefPaperFollower from './prefPaperFollower';

export default class PrefPaper {
	private _username: string;
	private _bula: number;
	private _refe = 0;
	private _left: PrefPaperColumn;
	private _middle: PrefPaperColumn;
	private _right: PrefPaperColumn;

	constructor(username: string, bula: number, refe?: number) {
		this._username = username;
		this._bula = bula;
		if (refe) this._refe = refe;

		this._left = new PrefPaperColumn(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(bula);
		this._right = new PrefPaperColumn(PrefPaperPosition.RIGHT);
	}

	processMyFollowing(data: PrefPaperFollower): PrefPaper {
		let {followed, tricks, failed, value, mainPosition, repealed} = data;
		if (followed) {
			this.addValue(mainPosition, value * tricks, repealed);
			if (failed) this.addMiddleValue(value, repealed);
		}
		return this;
	}

	reset(): PrefPaper {
		// this.score = -this.bula * 10;
		this.left = new PrefPaperColumn();
		this.middle = new PrefPaperColumn(this.bula, true);
		this.right = new PrefPaperColumn();
		return this;
	}

	hasUnplayedRefa() {
		return this.middle.getUnplayedRefasCount() > 0;
	}

	markLeftPlayedRefa(failed = false): PrefPaper {
		this.middle.markPlayedRefa("left", failed);
		return this;
	}

	markMiddlePlayedRefa(failed = false): PrefPaper {
		this.middle.markPlayedRefa("middle", failed);
		return this;
	}

	markRightPlayedRefa(failed = false): PrefPaper {
		this.middle.markPlayedRefa("right", failed);
		return this;
	}

	newRefa(): PrefPaper {
		this.middle.addRefa();
		return this;
	}

	addValue(position, value, repealed = false): PrefPaper {
		if ("left" === position) this.left.addValue(value, repealed);
		if ("right" === position) this.right.addValue(value, repealed);
		return this;
	}

	addMiddleValue(value, repealed = false): PrefPaper {
		this.middle.addValue(value, repealed);
		return this;
	}

	calculateScore(leftValue = 0, rightValue = 0): PrefPaper {
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
