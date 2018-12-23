#!/usr/bin/env node
"use strict";

import PrefPaperEntry from "./prefPaperEntry";

export type PrefPaperEntryNumberRepealedObject = { value: number, repealed: boolean };

export default class PrefPaperEntryNumber extends PrefPaperEntry {

	protected _repealed: boolean;	// <- Repealed by referee (poništena ruka)
	private readonly _value: number;

	constructor(value: number, repealed = false) {
		super();
		if (!PrefPaperEntry.isEven(value)) {
			throw new Error("PrefPaperEntryNumber::constructor:Value is not even " + value);
		}

		this._value = value;
		this._repealed = repealed;
	}

	get repealed() {
		return this._repealed;
	}

	set repealed(repealed: boolean) {
		this._repealed = repealed;
	}

	get number(): boolean {
		return true;
	}

	get value(): number {
		return this._value;
	}

	get json(): number | PrefPaperEntryNumberRepealedObject {
		if (this.repealed) return {value: this._value, repealed: true};
		return this._value;
	}
}
