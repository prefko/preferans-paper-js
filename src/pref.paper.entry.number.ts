'use strict';

import isEven from './functions/is.even';
import PrefPaperEntry from './pref.paper.entry';
import PrefPaperEntryNumberRepealedObjectType from './types/pref.paper.entry.number.repealed.object.type';

export default class PrefPaperEntryNumber extends PrefPaperEntry {
	protected _repealed: boolean = false; // <- Repealed by referee (poništena ruka)
	private readonly _value: number;

	constructor(value: number) {
		super();
		if (!isEven(value)) throw new Error('PrefPaperEntryNumber::constructor:Value is not even ' + value);

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

	get json(): number | PrefPaperEntryNumberRepealedObjectType {
		if (this.repealed) return {value: this._value, repealed: true};
		return this._value;
	}
}
