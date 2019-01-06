#!/usr/bin/env node
'use strict';

import { isNumber } from 'lodash';
import PrefPaperColumnMiddle from './prefPaperColumnMiddle';
import PrefPaperFollower from './prefPaperFollower';
import { PrefPaperPosition } from './prefPaperEnums';
import PrefPaperColumnSide from './prefPaperColumnSide';
import PrefPaperMain from './prefPaperMain';

export type PrefPaperObject = { score: number, username: string, refas: number, unusedRefas: number, left: number, middle: number, right: number };

export default class PrefPaper {
	// TODO: add replacements possibility
	private readonly _username: string;
	private readonly _bula: number;
	private readonly _refas = Infinity;
	private _unusedRefas = Infinity;
	private _left: PrefPaperColumnSide;
	private _middle: PrefPaperColumnMiddle;
	private _right: PrefPaperColumnSide;
	private _score: number;
	private _scoreCalculated: boolean = true;

	constructor(username: string, bula: number, refas: number = Infinity) {
		this._username = username;
		this._bula = bula;
		if (refas >= 0 && refas < Infinity) {
			this._refas = refas;
			this._unusedRefas = refas;
		}

		this._left = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
		this._score = -this._bula * 10;
	}

	public reset(): PrefPaper {
		this._left = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
		return this;
	}

	public calculateScore(leftValue: number, rightValue: number): PrefPaper {
		this._score = this.left + this.right - (this.middle * 10) - leftValue - rightValue;
		this._scoreCalculated = true;
		return this;
	}

	public processMain(main: PrefPaperMain, value: number, repealed: boolean = false) {
		if (main.username !== this.username) throw new Error('PrefPaper::processMain:Usernames do not match. ' + this.username + '!=' + main.username);
		this._scoreCalculated = false;
		return this.addMiddleValue(value, !main.failed, repealed);
	}

	public processFollowing(follower: PrefPaperFollower, value: number, mainPassed: boolean, mainsPosition: PrefPaperPosition, repealed: boolean = false): PrefPaper {
		if (follower.followed) this._scoreCalculated = false;

		switch (mainsPosition) {
			case PrefPaperPosition.LEFT:
				if (!repealed) this.markPlayedRefa(PrefPaperPosition.LEFT, mainPassed);
				if (follower.followed) this.addLeftSupa(value * follower.tricks, repealed);
				break;
			case PrefPaperPosition.RIGHT:
				if (!repealed) this.markPlayedRefa(PrefPaperPosition.RIGHT, mainPassed);
				if (follower.followed) this.addRightSupa(value * follower.tricks, repealed);
				break;
			default:
				throw new Error('PrefPaper::processFollowing:Invalid position ' + mainsPosition);
		}

		if (follower.followed && follower.failed) this._middle.addValue(value, repealed);

		return this;
	}

	public addNewRefa(): PrefPaper {
		if (this._unusedRefas <= 0) throw new Error('PrefPaper::addNewRefa:Cannot add any more refas! Unused refas count: ' + this._unusedRefas);

		this._unusedRefas--;
		this._middle.addRefa();
		return this;
	}

	public hasUnusedRefas(): boolean {
		return this._unusedRefas > 0;
	}

	public hasUnplayedRefa(position: PrefPaperPosition = PrefPaperPosition.MIDDLE): boolean {
		return this._middle.hasUnplayedRefa(position);
	}

	private addMiddleValue(value: number, passed: boolean, repealed: boolean): PrefPaper {
		if (!repealed) this.markPlayedRefa(PrefPaperPosition.MIDDLE, passed);
		this._middle.addValue(passed ? -value : value, repealed);
		return this;
	}

	private markPlayedRefa(position: PrefPaperPosition, passed: boolean): PrefPaper {
		if (this._middle.hasUnplayedRefa(position)) this._middle.markPlayedRefa(position, passed);
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

	get username(): string {
		return this._username;
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
		if (!this._scoreCalculated) throw new Error('PrefPaper::mini:Score is invalid. Entries were made without score recalculation.');

		return {
			score: this._score,
			left: this.left,
			middle: this.middle,
			right: this.right,
			refas: this._refas,
			unusedRefas: this._unusedRefas,
			username: this._username,
		};
	}

	get json(): object {
		if (!this._scoreCalculated) throw new Error('PrefPaper::mini:Score is invalid. Entries were made without score recalculation.');

		return {
			score: this._score,
			left: this._left.json,
			middle: this._middle.json,
			right: this._right.json,
			refas: this._refas,
			unusedRefas: this._unusedRefas,
			username: this._username,
		};
	}
};
