#!/usr/bin/env node
'use strict';

import PrefPaperColumnMiddle from './prefPaperColumnMiddle';
import PrefPaperFollower from './prefPaperFollower';
import {PrefPaperPosition} from './prefPaperEnums';
import PrefPaperColumnSide from './prefPaperColumnSide';
import PrefPaperMain from './prefPaperMain';

export type PrefPaperObject = { score: number, username: string, refas: number, unusedRefas: number, left: number, middle: number, right: number };

export default class PrefPaper {
	private _designation: 'p1' | 'p2' | 'p3';
	private _username: string;
	private readonly _bula: number;
	private readonly _refas = Infinity;
	private _unusedRefas = Infinity;
	private _left: PrefPaperColumnSide = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
	private _middle: PrefPaperColumnMiddle;
	private _right: PrefPaperColumnSide = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
	private _score: number;
	private _scoreCalculated: boolean = true;

	constructor(designation: 'p1' | 'p2' | 'p3', username: string, bula: number, refas: number = Infinity) {
		this._designation = designation;
		this._username = username;
		this._bula = bula;
		if (refas >= 0 && refas < Infinity) {
			this._refas = refas;
			this._unusedRefas = refas;
		}

		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._score = -this._bula * 10;
	}

	public reset(): PrefPaper {
		this._left = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
		this._score = -this._bula * 10;
		return this;
	}

	public calculateScore(supa1: number, supa2: number): PrefPaper {
		this._score = this.left + this.right - (this.middle * 10) - supa1 - supa2;
		this._scoreCalculated = true;
		return this;
	}

	public processAsMain(main: PrefPaperMain, value: number, repealed: boolean = false) {
		if (main.username !== this.username) throw new Error('PrefPaper::processAsMain:Usernames do not match. ' + this.username + '!=' + main.username);
		this._scoreCalculated = false;
		return this.addMiddleValue(value, !main.failed, repealed);
	}

	public processFollower(follower: PrefPaperFollower, value: number, mainPassed: boolean, mainsPosition: PrefPaperPosition, repealed: boolean = false): PrefPaper {
		if (follower.followed) this._scoreCalculated = false;

		if (!repealed) this.markPlayedRefa(mainsPosition, mainPassed);

		if (follower.followed) {
			let supa = value * follower.tricks;
			if (PrefPaperPosition.LEFT === mainsPosition) this.addLeftSupa(supa, repealed);
			else if (PrefPaperPosition.RIGHT === mainsPosition) this.addRightSupa(supa, repealed);
			else throw new Error('PrefPaper::processFollower:Invalid position ' + mainsPosition);

			if (follower.failed) this._middle.addValue(value, repealed);
		}

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

	get designation(): 'p1' | 'p2' | 'p3' {
		return this._designation;
	}

	get username(): string {
		return this._username;
	}

	set username(username: string) {
		this._username = username;
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
