#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperEntry, {PrefPaperEntryNumber} from "./prefPaperEntry";
import {PrefPaperPosition} from './prefPaperEnums';

const _even = (n: number): boolean => n % 2 === 0;

export default class PrefPaperColumn {
	protected _position: PrefPaperPosition;
	protected _values: Array<PrefPaperEntry>;
	protected _value: number;
	protected _initialValue: number;

	constructor(position: PrefPaperPosition, value = 0) {
		this._position = position;

		this._values = new Array<PrefPaperEntry>();
		this._initialValue = this._value = value;
		this.reset();
	}

	reset(): PrefPaperColumn {
		this._values = new Array<PrefPaperEntry>();
		this._value = this._initialValue;
		return this;
	}

	addValue(value: number, repealed = false): PrefPaperColumn {
		if (!_even(value)) throw new Error("PrefPaperColumn::addValue:Value is not even " + value);

		let newValue = this._value + value;
		let entry = new PrefPaperEntryNumber(newValue, true);
		if (repealed) {
			entry.repealed = true;
			this._values.push(entry);

		} else {
			this._value += newValue;
			if (0 !== this._value) this._values.push(entry);
		}

		return this;
	}

	get value(): number {
		return this._value;
	}

	get json(): Array<any> {
		return _.map(this._values, (val) => val.json);
	}

}
