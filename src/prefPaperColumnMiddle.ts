#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import {PrefPaperNumberEntry} from './prefPaperEntry';
import PrefPaperColumnSide from './prefPaperColumn';
import {PrefPaperPosition} from "./prefPaperEnums";

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
export default class PrefPaperColumnMiddle extends PrefPaperColumnSide {

	constructor(value: number) {
		super(PrefPaperPosition.MIDDLE);

		this._value = value;
		this._initialValue = value;
		this.reset();
	}

	reset() {
		super.reset();
		if (_validValue(this._value)) this._values.push(new PrefPaperNumberEntry(this._value));
		return this;
	}

	addValue(value, invalidated = false) {
		if (!_validValue(value)) throw new Error("PrefPaperColumnMiddle::addValue:Value is not valid " + value);
		if (invalidated) this.values.push({invalidated: true, value: this.value + value});
		else this.processNewValue(value);
		return this;
	}

	processNewValue(value): PrefPaperColumnMiddle {
		this.processHatAddition(value);
		super.processNewValue(value);
		if (this._value !== 0) this._values.push(this._value);
		return this;
	}

	processHatAddition(value): PrefPaperColumnMiddle {
		if (_shouldAddHatNormal(this.middle, this.values, this.value, value)) this.values.push({hat: 1});
		else if (_shouldAddHatCrossed(this.middle, this.values, this.value, value)) this.values.push({hat: -1});
		return this;
	}

	addRefa(): PrefPaperColumnMiddle {
		_checkMiddle(this.middle, "PrefPaperColumnMiddle::addRefa");
		this.values.push({
			left: 0,
			middle: 0,
			right: 0
		});
		return this;
	}

	getUnplayedRefasCount(): number {
		return _.size(_.filter(this._values, _isUnplayedRefa));
	}

	markPlayedRefa(position, failed = false): PrefPaperColumnMiddle {
		let index = _.findIndex(this.values, (i) => _.get(i, position, 222) === 0);
		if (index >= 0) _.set(this.values[index], position, (failed ? -1 : 1));
		return this;
	}

	getValue() {
		return this.value;
	}

	getJSON() {
		return this.values;
	}

}
