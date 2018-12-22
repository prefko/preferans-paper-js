#!/usr/bin/env node
"use strict";

import {PrefPaperPosition} from './prefPaperEnums';
import PrefPaperColumn from './prefPaperColumn';
import PrefPaperColumnMiddle from './prefPaperColumnMiddle';
import {PrefPaperPlayerFollower} from "./prefPaperPlayer";

export type PrefPaperObject = { username: string, refas: number, unusedRefas: number, left: number, middle: number, right: number };

export default class PrefPaper {
	private readonly _username: string;
	private readonly _bula: number;
	private readonly _refas = Infinity;
	private _unusedRefas = Infinity;
	private _left: PrefPaperColumn;
	private _middle: PrefPaperColumnMiddle;
	private _right: PrefPaperColumn;

	constructor(username: string, bula: number, refas?: number) {
		this._username = username;
		this._bula = bula;
		if (refas && refas > 0 && refas < Infinity) {
			this._refas = refas;
			this._unusedRefas = refas;
		}

		this._left = new PrefPaperColumn(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumn(PrefPaperPosition.RIGHT);
	}

	public reset(): PrefPaper {
		this._left = new PrefPaperColumn(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumn(PrefPaperPosition.RIGHT);
		return this;
	}

	public processFollowing(position: PrefPaperPosition, value: number, follower: PrefPaperPlayerFollower): PrefPaper {
		if (follower.followed) {
			switch (position) {
				case PrefPaperPosition.LEFT:
					this.addLeft(value * follower.tricks);
					break;
				case PrefPaperPosition.RIGHT:
					this.addRight(value * follower.tricks);
					break;
				default:
					throw new Error("PrefPaper::processFollowing:Invalid position " + position);
			}

			if (follower.failed) {
				this.addMiddle(value);
			}
		}
		return this;
	}

	public markPlayedRefa(position: PrefPaperPosition, failed = false): PrefPaper {
		this._middle.markPlayedRefa(position, failed);
		return this;
	}

	public addRefa(): PrefPaper {
		if (this._unusedRefas > 0) {
			this._unusedRefas--;
			this._middle.addRefa();
		}
		return this;
	}

	public addValue(position: PrefPaperPosition, value: number): PrefPaper {
		switch (position) {
			case PrefPaperPosition.LEFT:
				return this.addLeft(value);
			case PrefPaperPosition.MIDDLE:
				return this.addMiddle(value);
			case PrefPaperPosition.RIGHT:
				return this.addRight(value);
		}
	}

	private addLeft(value: number): PrefPaper {
		this._left.addValue(value);
		return this;
	}

	private addMiddle(value: number): PrefPaper {
		this._middle.addValue(value);
		return this;
	}

	private addRight(value: number): PrefPaper {
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
			left: this.leftValue,
			middle: this.middleValue,
			refas: this._refas,
			right: this.rightValue,
			username: this._username,
			unusedRefas: this._unusedRefas
		};
	}
};
