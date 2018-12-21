#!/usr/bin/env node
"use strict";

export default class PrefPaperEntry {

	protected _repealed = false;	// <- Repealed by referee (poništena ruka)
	protected _value: number;

	constructor(value: number) {
		this._value = value;
	}

	isNumber(): boolean {
		return true;
	}

	isRefa(): boolean {
		return false;
	}

	isHat(): boolean {
		return false;
	}

}

// TODO:
export class PrefPaperEntryRefa extends PrefPaperEntry {
	isRefa(): boolean {
		return true;
	}
}

// TODO:
export class PrefPaperEntryHat extends PrefPaperEntry {
	isHat(): boolean {
		return true;
	}
}