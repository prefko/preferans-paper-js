#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import {PrefPaperPosition} from './prefPaperEnums';
import {PrefPaperEntry} from "./prefPaperEntry";

const _even = (n: number): boolean => n % 2 === 0;
const _validValue = (v: number): boolean => _even(v) && v > 0;

const _lastNonZeroValue = (vals: Array<number>): number | undefined => {
	let nums = _.filter(vals, (val) => {
		return _.isInteger(val) && val !== 0;
	});
	return _.last(nums);
};

const _validAddHat = (v: number, a: number): boolean => a < 0 && (v + a) <= 0;
const _shouldAddHatNormal = (m, vs, v, a) => {
	if (!m) return false;
	let lastValue = _lastNonZeroValue(vs);
	if (lastValue && lastValue <= 0) return false;
	return _validAddHat(v, a);
};

const _validAddHatCrossed = (v: number, a: number): boolean => a > 0 && (v + a) >= 0;
const _shouldAddHatCrossed = (m, vs, v, a) => {
	if (!m) return false;
	if (_lastNonZeroValue(vs) >= 0) return false;
	return _validAddHatCrossed(v, a);
};

const _isUnplayedRefa = (i: object): boolean => _.get(i, "middle", 22) === 0;

const _checkMiddle = (m, s) => {
	if (!m) throw new Error(s + ":Cannot mark a refa in a soup column! middle=" + m);
};

// this.middle je bio FLAG da je u pitanju srednja kolona
export default class PrefPaperColumnSide {
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

	reset(): PrefPaperColumnSide {
		this._values = new Array<PrefPaperEntry>();
		this._value = this.initialValue;
		return this;
	}

	// TODO: add abstract prefPaperColumnEntry class to be extended by numbers, refa and hat
	processNewValue(value: number): PrefPaperColumnSide {
		this._value += value;
		return this;
	}

	addValue(value: number, invalidated = false): PrefPaperColumnSide {
		if (invalidated) this._values.push({invalidated: true, value: this.value + value});
		else this.processNewValue(value);
		return this;
	}

	getValue() {	// TODO
		return this._value;
	}

	getJSON(): any {	// TODO
		return this._values;
	}

}
