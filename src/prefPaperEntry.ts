#!/usr/bin/env node
"use strict";

export default class PrefPaperEntry {

	protected _repealed = false;	// <- Repealed by referee (poništena ruka)

	protected constructor(repealed: boolean) {
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

}

// TODO:
export class PrefPaperEntryNumber extends PrefPaperEntry {
	protected _value: number;

	constructor(value: number, repealed = false) {
		super(repealed);
		this._value = value;
	}

	get number(): boolean {
		return true;
	}
}

// TODO:
export class PrefPaperEntryRefa extends PrefPaperEntry {
	get refa(): boolean {
		return true;
	}
}

// TODO:
export class PrefPaperEntryHat extends PrefPaperEntry {
	get hat(): boolean {
		return true;
	}
}