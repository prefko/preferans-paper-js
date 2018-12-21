#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperEntry from "./prefPaperEntry";
import {PrefPaperPosition} from './prefPaperEnums';

const _even = (n: number): boolean => n % 2 === 0;
const _validValue = (v: number): boolean => _even(v) && v > 0;

// this.middle je bio FLAG da je u pitanju srednja kolona
export default class PrefPaperColumn {
	protected _position: PrefPaperPosition;
	protected _values: Array<PrefPaperEntry>;
	protected _value: number;
	protected _initialValue: number;

	constructor(position: PrefPaperPosition) {
		this._position = position;

		this._values = new Array<PrefPaperEntry>();
		this._value = 0;
		this._initialValue = 0;
		this.reset();
	}

	reset(): PrefPaperColumn {
		this._values = new Array<PrefPaperEntry>();
		this._value = this.initialValue;
		return this;
	}

	// TODO: add abstract prefPaperColumnEntry class to be extended by numbers, refa and hat
	processNewValue(value: number): PrefPaperColumn {
		this._value += value;
		return this;
	}

	addValue(value: number, repealed = false): PrefPaperColumn {
		if (repealed) this._values.push({repealed: true, value: this.value + value});
		else this.processNewValue(value);
		return this;
	}

	getValue() {	// TODO
		return this._value;
	}

	getJSON(): any {	// TODO: not any
		return this._values;
	}

}
