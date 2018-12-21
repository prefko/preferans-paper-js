#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperEntry, {PrefPaperEntryHat, PrefPaperEntryNumber, PrefPaperEntryRefa} from './prefPaperEntry';
import PrefPaperColumn from './prefPaperColumn';
import {PrefPaperPosition} from "./prefPaperEnums";

const _even = (n: number): boolean => n % 2 === 0;
const _validInitialValue = (v: number): boolean => _even(v) && v > 0;

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

// this.middle je bio FLAG da je u pitanju srednja kolona
export default class PrefPaperColumnMiddle extends PrefPaperColumn {

	constructor(value: number) {
		super(PrefPaperPosition.MIDDLE);

		this._value = value;
		this._initialValue = value;

		if (!_validInitialValue(value)) throw new Error("PrefPaperColumnMiddle::addValue:Value is not valid " + value);

		this.reset();
	}

	// TODO: remove the repealed boolean and add a REPEAL method

	reset() {
		super.reset();
		this._values.push(new PrefPaperEntryNumber(this._value));
		return this;
	}

	addValue(value: number, repealed = false) {
		if (repealed) this._values.push(new PrefPaperEntryNumber(this._value + value, true));
		else this.processNewValue(value);
		return this;
	}

	processNewValue(value: number): PrefPaperColumnMiddle {
		this.processHatAddition(value);
		super.processNewValue(value);
		if (this._value !== 0) this._values.push(new PrefPaperEntryNumber(this._value));
		return this;
	}

	processHatAddition(value: number): PrefPaperColumnMiddle {
		if (_shouldAddHatNormal(this.middle, this.values, this.value, value)) this.values.push({hat: 1});
		else if (_shouldAddHatCrossed(this.middle, this.values, this.value, value)) this.values.push({hat: -1});
		return this;
	}

	addRefa(): PrefPaperColumnMiddle {
		this._values.push(new PrefPaperEntryRefa());
		return this;
	}

	getUnplayedRefasCount(): number {
		// TODO
		return _.size(_.filter(this._values, _isUnplayedRefa));
	}

	markPlayedRefa(position: PrefPaperPosition, failed = false): PrefPaperColumnMiddle {
		// TODO
		let index = _.findIndex(this.values, (i) => _.get(i, position, 222) === 0);
		if (index >= 0) _.set(this.values[index], position, (failed ? -1 : 1));
		return this;
	}

	// TODO
	getValue() {
		return this._value;
	}

	// TODO
	getJSON() {
		return this._values;
	}

}
