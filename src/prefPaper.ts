#!/usr/bin/env node
"use strict";

import {PrefPaperPosition} from './prefPaperEnums';
import PrefPaperColumn from './prefPaperColumn';
import PrefPaperColumnMiddle from './prefPaperColumnMiddle';
import {PrefPaperPlayerFollower} from "./prefPaperPlayer";

export type PrefPaperObject = { username: string, refas: number, unusedRefas: number, left: number, middle: number, right: number };

export default class PrefPaper {
	readonly _username: string;
	readonly _bula: number;
	readonly _refas = Infinity;
	private _unusedRefas = Infinity;
	private _left: PrefPaperColumn;
	private _middle: PrefPaperColumnMiddle;
	private _right: PrefPaperColumn;

	constructor(username: string, bula: number, refas = 0) {
		this._username = username;
		this._bula = bula;
		if (refas > 0 && refas < Infinity) {
			this._refas = refas;
			this._unusedRefas = refas;
		}

		this._left = new PrefPaperColumn(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumn(PrefPaperPosition.RIGHT);
	}

	reset(): PrefPaper {
		this._left = new PrefPaperColumn(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumn(PrefPaperPosition.RIGHT);
		return this;
	}

	processFollowing(position: PrefPaperPosition, value: number, follower: PrefPaperPlayerFollower): PrefPaper {
		switch (position) {
			case PrefPaperPosition.LEFT:
				return this.processFollowingLeft(value, follower);
			case PrefPaperPosition.RIGHT:
				return this.processFollowingRight(value, follower);
			default:
				throw new Error("PrefPaper::processFollowing:Invalid position " + position);
		}
	}

	processFollowingLeft(value: number, follower: PrefPaperPlayerFollower, repealed = false): PrefPaper {
		if (follower.followed) {
			this.addLeft(value * follower.tricks);
			if (follower.failed) this.addMiddle(value);
		}
		return this;
	}

	processFollowingRight(value: number, follower: PrefPaperPlayerFollower): PrefPaper {
		if (follower.followed) {
			this.addRight(value * follower.tricks);
			if (follower.failed) this.addMiddle(value);
		}
		return this;
	}

	markPlayedRefa(position: PrefPaperPosition, failed = false): PrefPaper {
		this._middle.markPlayedRefa(position, failed);
		return this;
	}

	addRefa(): PrefPaper {
		if (this._unusedRefas > 0) {
			this._unusedRefas--;
			this._middle.addRefa();
		}
		return this;
	}

	addValue(position: PrefPaperPosition, value: number): PrefPaper {
		switch (position) {
			case PrefPaperPosition.LEFT:
				return this.addLeft(value);
			case PrefPaperPosition.MIDDLE:
				return this.addMiddle(value);
			case PrefPaperPosition.RIGHT:
				return this.addRight(value);
		}
	}

	addLeft(value: number): PrefPaper {
		this._left.addValue(value);
		return this;
	}

	addMiddle(value: number): PrefPaper {
		this._middle.addValue(value);
		return this;
	}

	addRight(value: number): PrefPaper {
		this._right.addValue(value);
		return this;
	}

	get leftValue(): number {
		return this._left.value;
	}

	get middleValue(): number {
		return this._middle.value;
	}

	get rightValue(): number {
		return this._right.value;
	}

	get json(): PrefPaperObject {
		return {
			username: this._username,
			refas: this._refas,
			unusedRefas: this._unusedRefas,
			left: this.leftValue,
			middle: this.middleValue,
			right: this.rightValue
		};
	}
};
