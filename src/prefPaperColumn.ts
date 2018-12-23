#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperEntry, {PrefPaperEntryNumber} from "./prefPaperEntry";
import {PrefPaperPosition} from './prefPaperEnums';

export default class PrefPaperColumn {

	protected _position: PrefPaperPosition;
	protected _values: PrefPaperEntry[];
	protected _value: number;
	protected _initialValue: number;

	constructor(position: PrefPaperPosition, value = 0) {
		this._position = position;

		this._values = [];
		this._initialValue = this._value = value;
		this.reset();
	}

	public reset(): PrefPaperColumn {
		this._values = [];
		this._value = this._initialValue;
		return this;
	}

	public addValue(value: number, repealed = false): PrefPaperColumn {
		const newValue = this._value + value;
		const entry = new PrefPaperEntryNumber(newValue, true);
		if (repealed) {
			entry.repealed = true;
			this._values.push(entry);

		} else {
			this._value += newValue;
			if (0 !== this._value) {
				this._values.push(entry);
			}
		}

		return this;
	}

	get value(): number {
		return this._value;
	}

	get json(): any[] {
		return _.map(this._values, (val) => val.json);
	}

}
