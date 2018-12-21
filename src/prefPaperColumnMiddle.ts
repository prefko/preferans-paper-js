#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperEntry, {PrefPaperEntryNumber, PrefPaperEntryRefa} from './prefPaperEntry';
import PrefPaperColumn from './prefPaperColumn';
import {PrefPaperPosition} from "./prefPaperEnums";

const _even = (n: number): boolean => n % 2 === 0;
const _validInitialValue = (v: number): boolean => _even(v) && v > 0;

const _lastNonZeroValue = (vals: Array<PrefPaperEntry>): number => {
	let nums = _.filter(vals, (v) => {
		if (true === v.number) {
			let n = v as PrefPaperEntryNumber;
			return 0 !== n.value;
		}
		return false;
	});
	if (_.isEmpty(nums)) return 0;

	let last = _.last(nums) as PrefPaperEntryNumber;
	return last.value;
};

const _validAddHat = (last: number, val: number): boolean => val < 0 && (last + val) <= 0;
const _shouldAddHatNormal = (vals: Array<PrefPaperEntry>, last: number, val: number): boolean => {
	if (_lastNonZeroValue(vals) < 0) return false;
	return _validAddHat(last, val);
};

const _validAddHatCrossed = (last: number, val: number): boolean => val > 0 && (last + val) >= 0;
const _shouldAddHatCrossed = (vals: Array<PrefPaperEntry>, last: number, val: number): boolean => {
	if (_lastNonZeroValue(vals) > 0) return false;
	return _validAddHatCrossed(last, val);
};

const _isUnplayedRefa = (v: PrefPaperEntry): boolean => {
	return _isUnplayedRefaForPostision(v, PrefPaperPosition.MIDDLE);
};

const _isUnplayedRefaForPostision = (v: PrefPaperEntry, position: PrefPaperPosition): boolean => {
	if (true === v.refa) {
		let r = v as PrefPaperEntryRefa;
		switch (position) {
			case PrefPaperPosition.LEFT:
				return 0 === r.left;
			case PrefPaperPosition.MIDDLE:
				return 0 === r.middle;
			case PrefPaperPosition.RIGHT:
				return 0 === r.right;
		}
	}
	return false;
};

export default class PrefPaperColumnMiddle extends PrefPaperColumn {

	constructor(value: number) {
		if (!_validInitialValue(value)) throw new Error("PrefPaperColumnMiddle::constructor:Value is not valid " + value);
		super(PrefPaperPosition.MIDDLE, value);
		this.reset();
	}

	reset() {
		super.reset();
		this._values.push(new PrefPaperEntryNumber(this._value));
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
			this.processHatAddition(value);
			this._value += newValue;
			if (0 !== this._value) this._values.push(entry);
		}

		return this;
	}

	processHatAddition(value: number): PrefPaperColumnMiddle {
		if (_shouldAddHatNormal(this._values, this._value, value)) this._values.push(new PrefPaperEntryRefa());
		else if (_shouldAddHatCrossed(this._values, this._value, value)) this._values.push(new PrefPaperEntryRefa(true));
		return this;
	}

	addRefa(): PrefPaperColumnMiddle {
		this._values.push(new PrefPaperEntryRefa());
		return this;
	}

	hasUnplayedRefa(): boolean {
		return this.getUnplayedRefasCount() > 0;
	}

	getUnplayedRefasCount(): number {
		return _.size(_.filter(this._values, _isUnplayedRefa));
	}

	markPlayedRefa(position: PrefPaperPosition, failed = false): PrefPaperColumnMiddle {
		let index = _.findIndex(this._values, (i) => _isUnplayedRefaForPostision(i, position));
		if (index >= 0) {
			let refaEntry = this._values[index] as PrefPaperEntryRefa;
			refaEntry.setPlayed(position, failed);
			this._values[index] = refaEntry;
		}
		return this;
	}

}
