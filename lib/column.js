#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const even = (n) => _.isInteger(n) && n % 2 === 0;
const validPosition = (p) => p === "left" || p === "middle" || p === "right";
const validValue = (v, m) => even(v) && (m || v > 0);
const validStartValue = (v, m) => m ? validValue(v, m) : !v;

const lastNonZeroValue = (vals) => {
	let nums = _.filter(vals, (val) => {
		return _.isInteger(val) && val !== 0;
	});
	return _.last(nums);
};

const shouldAddHatNormal = (m, vs, v, a) => {
	let last = lastNonZeroValue(vs);
	return m && last > 0 && a < 0 && (v + a) <= 0;
};
const shouldAddHatCrossed = (m, vs, v, a) => {
	let last = lastNonZeroValue(vs);
	return m && last < 0 && a > 0 && (v + a) >= 0;
};

const isUnplayedRefa = (i) => _.isPlainObject(i) && _.get(i, "middle", 22) === 0;

const checkMiddle = (m, source) => {
	if (!m) {
		throw new Error(source + ":Cannot mark a refa in a soup column! middle=" + m);
	}
};

const checkPosition = (position, source) => {
	if (!validPosition(position)) {
		throw new Error(source + ":Invalid position " + position);
	}
};

class PrefPaperColumn {

	constructor(value, middle = false) {
		if (!validStartValue(value, middle)) {
			throw new Error("PrefPaperColumn::constructor:Value is not valid " + value);
		}
		this.middle = middle;
		this.initialValue = this.middle ? value : 0;
		this.reset();

		return this;
	}

	reset() {
		this.values = [];
		this.value = this.initialValue;
		if (this.middle && validStartValue(this.value, this.middle)) {
			this.values.push(this.value);
		}
		return this;
	}

	processNewValue(value) {
		this.processHatAddition(value);

		this.value += value;
		if (this.value !== 0) {
			this.values.push(this.value);
		}
	}

	addValue(value, invalidated = false) {
		if (!validValue(value, this.middle)) {
			throw new Error("PrefPaperColumn::addValue:Value is not valid " + value);
		}
		if (invalidated) {
			this.values.push({invalidated: true, value: this.value + value});
		} else {
			this.processNewValue(value);
		}
		return this;
	}

	processHatAddition(value) {
		if (shouldAddHatNormal(this.middle, this.values, this.value, value)) {
			this.values.push({hat: 1});
		} else if (shouldAddHatCrossed(this.middle, this.values, this.value, value)) {
			this.values.push({hat: -1});
		}
		return this;
	}

	addRefa() {
		checkMiddle(this.middle, "PrefPaperColumn::addRefa");
		this.values.push({
			left: 0,
			middle: 0,
			right: 0
		});
		return this;
	}

	getUnplayedRefasCount() {
		return _.size(_.filter(this.values, isUnplayedRefa));
	}

	markPlayedRefa(position, failed = false) {
		checkMiddle(this.middle, "PrefPaperColumn::markPlayedRefa");
		checkPosition(position, "PrefPaperColumn::markPlayedRefa");
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

module.exports = PrefPaperColumn;
