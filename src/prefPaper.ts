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

	public addMiddleValue(value: number, repealed: boolean = false): PrefPaper {
		if (!repealed && this._middle.hasUnplayedRefa()) {
			this._middle.markPlayedRefa(PrefPaperPosition.MIDDLE, value > 0);
		}
		this._middle.addValue(value, repealed);
		return this;
	}

	public processFollowing(mainPosition: PrefPaperPosition, value: number, follower: PrefPaperFollower, repealed: boolean = false): PrefPaper {
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

	public addNewRefa(): PrefPaper {
		if (this._unusedRefas <= 0) throw new Error("PrefPaper::addNewRefa:Cannot add any more refas! Unused refas cound: " + this._unusedRefas);

		this._unusedRefas--;
		this._middle.addRefa();
		return this;
	}

	public markPlayedRefa(position: PrefPaperPosition, passed: boolean): PrefPaper {
		this._middle.markPlayedRefa(position, passed);
		return this;
	}

	private addLeftSupa(value: number, repealed: boolean): PrefPaper {
		this._left.addValue(value, repealed);
		return this;
	}

	private addRightSupa(value: number, repealed: boolean): PrefPaper {
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

	get mini(): PrefPaperObject {
		return {
			left: this.left,
			middle: this.middle,
			right: this.right,
			refas: this._refas,
			unusedRefas: this._unusedRefas,
			username: this._username
		};
	}

	get json(): object {
		return {
			left: this._left.json,
			middle: this._middle.json,
			right: this._right.json,
			refas: this._refas,
			unusedRefas: this._unusedRefas,
			username: this._username
		};
	}
};
