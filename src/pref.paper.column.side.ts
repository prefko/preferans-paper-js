'use strict';

import PrefPaperColumn from './pref.paper.column';
import PrefPaperEntryNumber from './pref.paper.entry.number';

import PrefPaperPosition from './enums/pref.paper.position';

export default class PrefPaperColumnSide extends PrefPaperColumn {
	protected _position: PrefPaperPosition;

	constructor(position: PrefPaperPosition) {
		super();
		this._position = position;
	}

	public addValue(value: number): PrefPaperColumn {
		const entry = this._pushValue(value);
		this._value = entry.value;
		return this;
	}

	public addValueRepealed(value: number): PrefPaperColumn {
		this._pushValue(value, true);
		return this;
	}

	private _pushValue(value: number, repealed: boolean = false): PrefPaperEntryNumber {
		if (!PrefPaperColumn.isValidValue(value)) throw new Error('PrefPaperColumn::pushValue:Value is not valid: ' + value + '. Value must be larger than 0 and even.');

		const newValue = this._value + value;
		const entry = new PrefPaperEntryNumber(newValue);
		entry.repealed = repealed;
		this._values.push(entry);

		return entry;
	}
}
