'use strict';

import {map} from 'lodash';

import PrefPaperEntry from './pref.paper.entry';
import isEven from './functions/is.even';

export default abstract class PrefPaperColumn {
	protected static isValidValue(v: number): boolean {
		return v > 0 && isEven(v);
	}

	protected _value: number = 0;
	protected _initialValue: number = 0;
	protected _values: PrefPaperEntry[] = [];

	public abstract addValue(value: number): PrefPaperColumn;

	public abstract addValueRepealed(value: number): PrefPaperColumn;

	public reset(): PrefPaperColumn {
		this._values = [];
		this._value = this._initialValue;
		return this;
	}

	get value(): number {
		return this._value;
	}

	get json(): object[] {
		return map(this._values, (val) => val.json);
	}
}
