#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperColumn from './prefPaperColumn';
import {PrefPaperPosition} from "./prefPaperEnums";
import PrefPaperEntry from "./prefPaperEntry";
import PrefPaperEntryNumber from "./prefPaperEntryNumber";
import PrefPaperEntryRefa from "./prefPaperEntryRefa";
import PrefPaperEntryHat from "./prefPaperEntryHat";

const getLastNonZeroValue = (vals: PrefPaperEntry[]): number => {
	const nums = _.filter(vals, (v) => {
		if (true === v.number) {
			const n = v as PrefPaperEntryNumber;
			return 0 !== n.value;
		}
		return false;
	});

	const last = _.last(nums) as PrefPaperEntryNumber;
	return last.value;
};

const validAddHat = (last: number, val: number): boolean => val < 0 && (last + val) <= 0;
const shouldAddHat = (vals: PrefPaperEntry[], last: number, val: number): boolean => {
	if (getLastNonZeroValue(vals) < 0) return false;
	return validAddHat(last, val);
};

const validAddHatCrossed = (last: number, val: number): boolean => val > 0 && (last + val) >= 0;
const shouldAddHatCrossed = (vals: PrefPaperEntry[], last: number, val: number): boolean => {
	if (getLastNonZeroValue(vals) > 0) return false;
	return validAddHatCrossed(last, val);
};

const isUnplayedRefaForPosition = (v: PrefPaperEntry, position: PrefPaperPosition): boolean => {
	if (true === v.refa) {
		const r = v as PrefPaperEntryRefa;
		switch (position) {
			case PrefPaperPosition.LEFT:
				return !r.leftPlayed;
			case PrefPaperPosition.MIDDLE:
				return !r.middlePlayed;
			case PrefPaperPosition.RIGHT:
				return !r.rightPlayed;
		}
	}
	return false;
};

export default class PrefPaperColumnMiddle extends PrefPaperColumn {

	constructor(value: number) {
		if (!PrefPaperColumn.isValidValue(value)) throw new Error("PrefPaperColumnMiddle::constructor:Value is not valid " + value + ". Value must be larger than 0 and even.");

		super();

		this._initialValue = value;
		this.reset();
	}

	public reset() {
		this._value = this._initialValue;
		this._values = [new PrefPaperEntryNumber(this._initialValue)];
		return this;
	}

	public addValue(value: number, repealed: boolean = false): PrefPaperColumnMiddle {
		if (!PrefPaperEntry.isEven(value)) throw new Error("PrefPaperColumnMiddle::addValue:Value is not valid: " + value + ". Value must be larger than 0 and even.");

		const newValue = this._value + value;
		const entry = new PrefPaperEntryNumber(newValue);
		if (repealed) {
			entry.repealed = true;
			this._values.push(entry);

		} else {
			this.processHatAddition(value);
			this._value = newValue;
			if (0 !== this._value) {
				this._values.push(entry);
			}
		}

		return this;
	}

	public processHatAddition(value: number): PrefPaperColumnMiddle {
		if (shouldAddHat(this._values, this._value, value)) {
			this._values.push(new PrefPaperEntryHat());
		} else if (shouldAddHatCrossed(this._values, this._value, value)) {
			this._values.push(new PrefPaperEntryHat(true));
		}
		return this;
	}

	public addRefa(): PrefPaperColumnMiddle {
		this._values.push(new PrefPaperEntryRefa());
		return this;
	}

	public markPlayedRefa(position: PrefPaperPosition, passed: boolean): PrefPaperColumnMiddle {
		const index = _.findIndex(this._values, (i) => isUnplayedRefaForPosition(i, position));
		if (index < 0) {
			throw new Error("PrefPaperColumnMiddle::markPlayedRefa:There are no open refas for that position: " + position);
		}

		const r = this._values[index] as PrefPaperEntryRefa;
		r.setPlayed(position, passed);
		this._values[index] = r;
		return this;
	}

	public hasUnplayedRefa(position: PrefPaperPosition = PrefPaperPosition.MIDDLE): boolean {
		return this.getUnplayedRefasCount(position) > 0;
	}

	private getUnplayedRefasCount(position: PrefPaperPosition): number {
		return _.size(_.filter(this._values, (i) => isUnplayedRefaForPosition(i, position)));
	}

}
