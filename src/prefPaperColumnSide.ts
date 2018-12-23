#!/usr/bin/env node
"use strict";

import {PrefPaperPosition} from './prefPaperEnums';
import PrefPaperEntryNumber from "./prefPaperEntryNumber";
import PrefPaperColumn from "./prefPaperColumn";

export default class PrefPaperColumnSide extends PrefPaperColumn {
	protected _position: PrefPaperPosition;

	constructor(position: PrefPaperPosition) {
		super();
		this._position = position;
	}

	public addValue(value: number, repealed: boolean = false): PrefPaperColumn {
		if (!PrefPaperColumn.isValidValue(value)) {
			throw new Error("PrefPaperColumn::addValue:Value is not valid: " + value + ". Value must be larger than 0 and even.");
		}

		const newValue = this._value + value;
		const entry = new PrefPaperEntryNumber(newValue);
		if (repealed) {
			entry.repealed = true;
		} else {
			this._value = newValue;
		}
		this._values.push(entry);

		return this;
	}

}
