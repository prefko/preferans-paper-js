#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import PrefPaperColumn from './prefPaperColumn';

export default class PrefPaperColumnMiddle extends PrefPaperColumn {

	constructor(value: number) {
		super();

		this.middle = value;
		this.initialValue = value;
		this.reset();
	}

	reset() {
		this.values = [];
		this.value = this.initialValue;
		if (this.middle && _validStartValue(this.value, this.middle)) this.values.push(this.value);
		return this;
	}

	processNewValue(value) {
		this.processHatAddition(value);
		this.value += value;
		if (this.value !== 0) this.values.push(this.value);
	}

	addValue(value, invalidated = false) {
		if (!_validValue(value, this.middle)) throw new Error("PrefPaperColumn::addValue:Value is not valid " + value);
		if (invalidated) this.values.push({invalidated: true, value: this.value + value});
		else this.processNewValue(value);
		return this;
	}

	processHatAddition(value) {
		if (_shouldAddHatNormal(this.middle, this.values, this.value, value)) this.values.push({hat: 1});
		else if (_shouldAddHatCrossed(this.middle, this.values, this.value, value)) this.values.push({hat: -1});
		return this;
	}

	addRefa() {
		_checkMiddle(this.middle, "PrefPaperColumn::addRefa");
		this.values.push({
			left: 0,
			middle: 0,
			right: 0
		});
		return this;
	}

	getUnplayedRefasCount() {
		return _.size(_.filter(this.values, _isUnplayedRefa));
	}

	markPlayedRefa(position, failed = false) {
		_checkMiddle(this.middle, "PrefPaperColumn::markPlayedRefa");
		_checkPosition(position, "PrefPaperColumn::markPlayedRefa");
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
