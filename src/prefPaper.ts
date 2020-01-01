#!/usr/bin/env node
'use strict';

import PrefPaperColumnMiddle from './prefPaperColumnMiddle';
import {PrefPaperPosition} from './prefPaperEnums';
import PrefPaperColumnSide from './prefPaperColumnSide';

type PrefDesignation = 'p1' | 'p2' | 'p3';
type PrefPaperObject = { designation: PrefDesignation, left: object[], middle: object[], right: object[] };
type PrefPaperMiniObject = { designation: PrefDesignation, left: number, middle: number, right: number };

export default class PrefPaper {
	private readonly _designation: PrefDesignation;
	private readonly _bula: number;
	private _left: PrefPaperColumnSide;
	private _middle: PrefPaperColumnMiddle;
	private _right: PrefPaperColumnSide;

	constructor(designation: PrefDesignation, bula: number) {
		this._designation = designation;
		this._bula = bula;

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

	private _markPlayedRefaPassed(position: PrefPaperPosition): PrefPaper {
		if (this._middle.hasOpenRefa(position)) this._middle.markPlayedRefaPassed(position);
		return this;
	}

	private _markPlayedRefaFailed(position: PrefPaperPosition): PrefPaper {
		if (this._middle.hasOpenRefa(position)) this._middle.markPlayedRefaFailed(position);
		return this;
	}

	public processAsMain(value: number, designation: PrefDesignation, failed: boolean) {
		if (designation !== this.designation) throw new Error('PrefPaper::processAsMain:Designations do not match. ' + this.designation + '!=' + designation);
		if (failed) this._markPlayedRefaFailed(PrefPaperPosition.MIDDLE);
		else this._markPlayedRefaPassed(PrefPaperPosition.MIDDLE);
		this._middle.addValue(failed ? value : -value);
		return this;
	}

	public processAsMainRepealed(value: number, designation: PrefDesignation, failed: boolean) {
		if (designation !== this.designation) throw new Error('PrefPaper::processAsMain:Designations do not match. ' + this.designation + '!=' + designation);
		this._middle.addValueRepealed(failed ? value : -value);
		return this;
	}

	public processAsFollower(value: number, tricks: number, failed: boolean,
							 mainsPosition: PrefPaperPosition.LEFT | PrefPaperPosition.RIGHT): PrefPaper {
		let supa = value * tricks;
		if (PrefPaperPosition.LEFT === mainsPosition) this._addLeftSupa(supa);
		else this._addRightSupa(supa);
		if (failed) this._middle.addValue(value);
		return this;
	}

	public processAsFollowerRepealed(value: number, tricks: number, failed: boolean,
									 mainsPosition: PrefPaperPosition.LEFT | PrefPaperPosition.RIGHT): PrefPaper {
		let supa = value * tricks;
		if (PrefPaperPosition.LEFT === mainsPosition) this._addLeftSupaRepealed(supa);
		else this._addRightSupaRepealed(supa);
		if (failed) this._middle.addValueRepealed(value);
		return this;
	}

	public addNewRefa(): PrefPaper {
		this._middle.addRefa();
		return this;
	}

	public hasUnplayedRefa(position: PrefPaperPosition = PrefPaperPosition.MIDDLE): boolean {
		return this._middle.hasOpenRefa(position);
	}

	private _addLeftSupa(value: number): PrefPaper {
		this._left.addValue(value);
		return this;
	}

	private _addLeftSupaRepealed(value: number): PrefPaper {
		this._left.addValueRepealed(value);
		return this;
	}

	private _addRightSupa(value: number): PrefPaper {
		this._right.addValue(value);
		return this;
	}

	private _addRightSupaRepealed(value: number): PrefPaper {
		this._right.addValueRepealed(value);
		return this;
	}

	get designation(): PrefDesignation {
		return this._designation;
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

	get mini(): PrefPaperMiniObject {
		return {
			designation: this._designation,
			left: this.left,
			middle: this.middle,
			right: this.right
		};
	}

	get json(): PrefPaperObject {
		return {
			designation: this._designation,
			left: this._left.json,
			middle: this._middle.json,
			right: this._right.json
		};
	}
};
