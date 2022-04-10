'use strict';

import * as _ from 'lodash';

import PrefPaperEntry from './pref.paper.entry';
import PrefPaperColumn from './pref.paper.column';
import PrefPaperEntryHat from './pref.paper.entry.hat';
import PrefPaperEntryRefa from './pref.paper.entry.refa';
import PrefPaperPosition from './enums/pref.paper.position';
import PrefPaperEntryNumber from './pref.paper.entry.number';

const _getLastNonZeroValue = (vals: PrefPaperEntry[]): number => {
	const nums = _.filter(vals, (v: PrefPaperEntry): boolean => {
		if (v.isNumber) {
			const n = v as PrefPaperEntryNumber;
			return 0 !== n.value;
		}
		return false;
	});
	const last = _.last(nums) as PrefPaperEntryNumber;
	return last.value;
};

const _validAddHat = (last: number, val: number): boolean => val < 0 && last + val <= 0;
const _shouldAddHat = (vals: PrefPaperEntry[], last: number, val: number): boolean => (_getLastNonZeroValue(vals) < 0 ? false : _validAddHat(last, val));

const _validAddHatCrossed = (last: number, val: number): boolean => val > 0 && last + val >= 0;
const _shouldAddHatCrossed = (vals: PrefPaperEntry[], last: number, val: number): boolean => (_getLastNonZeroValue(vals) > 0 ? false : _validAddHatCrossed(last, val));

const _isUnplayedRefaForPosition = (v: PrefPaperEntry, position: PrefPaperPosition): boolean => {
	if (v.isRefa) {
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
		if (!PrefPaperColumn.isValidValue(value)) throw new Error('PrefPaperColumnMiddle::constructor:Value is not valid ' + value + '. Value must be larger than 0 and even.');

		super();
		this._initialValue = value;
		this.reset();
	}

	public reset() {
		this._value = this._initialValue;
		this._values = [new PrefPaperEntryNumber(this._initialValue)];
		return this;
	}

	public addValue(value: number): PrefPaperColumnMiddle {
		const entry = this._makeNumberEntry(value);
		this._value = entry.value;
		this._processHats(value); // <- ALWAYS before the .push(entry)
		if (0 !== this._value) this._values.push(entry);
		return this;
	}

	public addValueRepealed(value: number): PrefPaperColumnMiddle {
		const entry = this._makeNumberEntry(value);
		entry.repealed = true;
		this._values.push(entry);
		return this;
	}

	public addRefa(): PrefPaperColumnMiddle {
		this._values.push(new PrefPaperEntryRefa());
		return this;
	}

	public markPlayedRefaPassed(position: PrefPaperPosition): PrefPaperColumnMiddle {
		return this._markPlayedRefa(position, false);
	}

	public markPlayedRefaFailed(position: PrefPaperPosition): PrefPaperColumnMiddle {
		return this._markPlayedRefa(position, true);
	}

	public hasOpenRefa(position: PrefPaperPosition = PrefPaperPosition.MIDDLE): boolean {
		return this._getOpenRefasCount(position) > 0;
	}

	private _markPlayedRefa(position: PrefPaperPosition, failed: boolean): PrefPaperColumnMiddle {
		const index = _.findIndex(this._values, (i: PrefPaperEntry): boolean => _isUnplayedRefaForPosition(i, position));
		if (index < 0) throw new Error('PrefPaperColumnMiddle::markPlayedRefa:There are no open refas for that position: ' + position);

		const r = this._values[index] as PrefPaperEntryRefa;
		if (failed) r.setPlayedFailed(position);
		else r.setPlayedPassed(position);
		this._values[index] = r;
		return this;
	}

	private _getOpenRefasCount(position: PrefPaperPosition): number {
		return _.size(_.filter(this._values, (i: PrefPaperEntry): boolean => _isUnplayedRefaForPosition(i, position)));
	}

	private _makeNumberEntry(value: number): PrefPaperEntryNumber {
		return new PrefPaperEntryNumber(this._value + value);
	}

	private _processHats(value: number): PrefPaperColumnMiddle {
		if (_shouldAddHat(this._values, this._value, value)) {
			this._values.push(new PrefPaperEntryHat());
		} else if (_shouldAddHatCrossed(this._values, this._value, value)) {
			const hat = new PrefPaperEntryHat();
			hat.crossed = true;
			this._values.push(hat);
		}
		return this;
	}
}
