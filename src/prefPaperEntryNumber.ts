#!/usr/bin/env node
"use strict";

import PrefPaperEntry from "./prefPaperEntry";

export type PrefPaperEntryNumberRepealedObject = { value: number, repealed: boolean };

const _isEven = (n: number): boolean => n % 2 === 0;

export default class PrefPaperEntryNumber extends PrefPaperEntry {

	protected _repealed: boolean = false;	// <- Repealed by referee (poništena ruka)
	private readonly _value: number;

	constructor(value: number) {
		super();
		if (!_isEven(value)) throw new Error("PrefPaperEntryNumber::constructor:Value is not even " + value);

		this._value = value;
	}

	set repealed(repealed: boolean) {
		this._repealed = repealed;
	}

	get repealed() {
		return this._repealed;
	}

	get value(): number {
		return this._value;
	}

	get isNumber(): boolean {
		return true;
	}

	get json(): number | PrefPaperEntryNumberRepealedObject {
		if (this.repealed) return {value: this._value, repealed: true};
		return this._value;
	}
}
