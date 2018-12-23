#!/usr/bin/env node
"use strict";

import {isNumber} from 'lodash';
import PrefPaperColumnMiddle from './prefPaperColumnMiddle';
import PrefPaperFollower from "./prefPaperFollower";
import {PrefPaperPosition} from './prefPaperEnums';
import PrefPaperColumnSide from "./prefPaperColumnSide";

export type PrefPaperObject = { username: string, refas: number, unusedRefas: number, left: number, middle: number, right: number };

export default class PrefPaper {
	private readonly _username: string;
	private readonly _bula: number;
	private readonly _refas = Infinity;
	private _unusedRefas = Infinity;
	private _left: PrefPaperColumnSide;
	private _middle: PrefPaperColumnMiddle;
	private _right: PrefPaperColumnSide;

	constructor(username: string, bula: number, refas?: number) {
		this._username = username;
		this._bula = bula;
		if (isNumber(refas) && refas >= 0 && refas < Infinity) {
			this._refas = refas;
			this._unusedRefas = refas;
		}

		this._left = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
	}

	public reset(): PrefPaper {
		this._left = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
		return this;
	}

	public processFollowing(mainPosition: PrefPaperPosition, value: number, follower: PrefPaperFollower, repealed = false): PrefPaper {
		if (follower.followed) {
			switch (mainPosition) {
				case PrefPaperPosition.LEFT:
					this.addLeftSupa(value * follower.tricks, repealed);
					break;
				case PrefPaperPosition.RIGHT:
					this.addRightSupa(value * follower.tricks, repealed);
					break;
				default:
					throw new Error("PrefPaper::processFollowing:Invalid position " + mainPosition);
			}

			if (follower.failed) {
				this.addMiddleValue(value, repealed);
			}
		}
		return this;
	}

	public markPlayedRefa(position: PrefPaperPosition, passed: boolean): PrefPaper {
		this._middle.markPlayedRefa(position, passed);
		return this;
	}

	public addNewRefa(): PrefPaper {
		if (this._unusedRefas > 0) {
			this._unusedRefas--;
			this._middle.addRefa();
		}
		return this;
	}

	public addLeftSupa(value: number, repealed = false): PrefPaper {
		this._left.addValue(value, repealed);
		return this;
	}

	public addMiddleValue(value: number, repealed = false): PrefPaper {
		this._middle.addValue(value, repealed);
		return this;
	}

	public addRightSupa(value: number, repealed = false): PrefPaper {
		this._right.addValue(value, repealed);
		return this;
	}

	get left(): number {
		return this._left.value;
	}

	get middle(): number {
		return this._middle.value;
	}

	get right(): number {
		return this._right.value;
	}

	get json(): PrefPaperObject {
		return {
			left: this.left,
			middle: this.middle,
			refas: this._refas,
			right: this.right,
			unusedRefas: this._unusedRefas,
			username: this._username
		};
	}
};
