#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperColumn from './prefPaperColumn';
import PrefPaperEntry, {PrefPaperEntryHat, PrefPaperEntryNumber, PrefPaperEntryRefa} from './prefPaperEntry';
import {PrefPaperPosition} from "./prefPaperEnums";

const _lastNonZeroValue = (vals: PrefPaperEntry[]): number => {
	const nums = _.filter(vals, (v) => {
		if (true === v.number) {
			const n = v as PrefPaperEntryNumber;
			return 0 !== n.value;
		}
		return false;
	});
	if (_.isEmpty(nums)) {
		return 0;
	}

	const last = _.last(nums) as PrefPaperEntryNumber;
	return last.value;
};

const _validAddHat = (last: number, val: number): boolean => val < 0 && (last + val) <= 0;
const _shouldAddHatNormal = (vals: PrefPaperEntry[], last: number, val: number): boolean => {
	if (_lastNonZeroValue(vals) < 0) {
		return false;
	}
	return _validAddHat(last, val);
};

const _validAddHatCrossed = (last: number, val: number): boolean => val > 0 && (last + val) >= 0;
const _shouldAddHatCrossed = (vals: PrefPaperEntry[], last: number, val: number): boolean => {
	if (_lastNonZeroValue(vals) > 0) {
		return false;
	}
	return _validAddHatCrossed(last, val);
};

const _isUnplayedRefaForPosition = (v: PrefPaperEntry, position: PrefPaperPosition): boolean => {
	if (true === v.refa) {
		const r = v as PrefPaperEntryRefa;
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

const _isUnplayedRefa = (v: PrefPaperEntry): boolean => {
	return _isUnplayedRefaForPosition(v, PrefPaperPosition.MIDDLE);
};

export default class PrefPaperColumnMiddle extends PrefPaperColumn {

	private static isValidInitialValue(v: number): boolean {
		return PrefPaperColumnMiddle.isEven(v) && v > 0;
	}

	constructor(value: number) {
		if (!PrefPaperColumnMiddle.isValidInitialValue(value)) {
			throw new Error("PrefPaperColumnMiddle::constructor:Value is not valid " + value);
		}
		super(PrefPaperPosition.MIDDLE, value);
		this.reset();
	}

	public reset() {
		super.reset();
		this._values.push(new PrefPaperEntryNumber(this._value));
		return this;
	}

	public addValue(value: number, repealed = false): PrefPaperColumn {
		if (!PrefPaperColumnMiddle.isEven(value)) {
			throw new Error("PrefPaperColumn::addValue:Value is not even " + value);
		}

		const newValue = this._value + value;
		const entry = new PrefPaperEntryNumber(newValue, true);
		if (repealed) {
			entry.repealed = true;
			this._values.push(entry);

		} else {
			this.processHatAddition(value);
			this._value += newValue;
			if (0 !== this._value) {
				this._values.push(entry);
			}
		}

		return this;
	}

	public processHatAddition(value: number): PrefPaperColumnMiddle {
		if (_shouldAddHatNormal(this._values, this._value, value)) {
			this._values.push(new PrefPaperEntryHat());
		} else if (_shouldAddHatCrossed(this._values, this._value, value)) {
			this._values.push(new PrefPaperEntryHat(true));
		}
		return this;
	}

	public addRefa(): PrefPaperColumnMiddle {
		this._values.push(new PrefPaperEntryRefa());
		return this;
	}

	public hasUnplayedRefa(): boolean {
		return this.getUnplayedRefasCount() > 0;
	}

	public getUnplayedRefasCount(): number {
		return _.size(_.filter(this._values, _isUnplayedRefa));
	}

	public markPlayedRefa(position: PrefPaperPosition, failed = false): PrefPaperColumnMiddle {
		const index = _.findIndex(this._values, (i) => _isUnplayedRefaForPosition(i, position));
		if (index >= 0) {
			const r = this._values[index] as PrefPaperEntryRefa;
			r.setPlayed(position, failed);
			this._values[index] = r;
		}
		return this;
	}

}
