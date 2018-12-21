#!/usr/bin/env node
"use strict";

import {PrefPaperPosition} from "./prefPaperEnums";

export default abstract class PrefPaperEntry {
	protected _repealed = false;	// <- Repealed by referee (poništena ruka)

	protected constructor(repealed: boolean) {
		this._repealed = repealed;
	}

	get repealed() {
		return this._repealed;
	}

	set repealed(repealed: boolean) {
		this._repealed = repealed;
	}

	get number(): boolean {
		return false;
	}

	get refa(): boolean {
		return false;
	}

	get hat(): boolean {
		return false;
	}

	abstract get json(): any;
};

// TODO:
export class PrefPaperEntryNumber extends PrefPaperEntry {
	readonly _value: number;

	constructor(value: number, repealed = false) {
		super(repealed);
		this._value = value;
	}

	get number(): boolean {
		return true;
	}

	get value(): number {
		return this._value;
	}

	get json(): number {
		return this._value;
	}
};

export type PrefPaperEntryRefaObject = { left: number, middle: number, right: number };

export class PrefPaperEntryRefa extends PrefPaperEntry {
	private _left = 0;
	private _middle = 0;
	private _right = 0;

	constructor(repealed = false) {
		super(repealed);
	}

	setPlayed(position: PrefPaperPosition, failed = false): PrefPaperEntry {
		switch (position) {
			case PrefPaperPosition.LEFT:
				this._left = failed ? -1 : 1;
			case PrefPaperPosition.MIDDLE:
				this._middle = failed ? -1 : 1;
			case PrefPaperPosition.RIGHT:
				this._right = failed ? -1 : 1;
		}
		return this;
	}

	get refa(): boolean {
		return true;
	}

	get left(): number {
		return this._left;
	}

	get middle(): number {
		return this._middle;
	}

	get right(): number {
		return this._right;
	}

	get json(): PrefPaperEntryRefaObject {
		return {
			left: this.left,
			middle: this.middle,
			right: this.right
		};
	}
};

export type PrefPaperEntryHatObject = { hat: number };

export class PrefPaperEntryHat extends PrefPaperEntry {
	readonly _crossed: boolean;

	constructor(crossed = false) {
		super(false);
		this._crossed = crossed;
	}

	get crossed(): boolean {
		return this._crossed;
	}

	get hat(): boolean {
		return true;
	}

	get json(): PrefPaperEntryHatObject {
		return {hat: this._crossed ? -1 : 1};
	}
};