#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const even = (n) => n % 2 === 0;
const validPosition = (p) => p === "left" || p === "middle" || p === "right";
const validValue = (v, m) => v && _.isInteger(v) && even(v) && (!!m || v > 0);
const validStartValue = (v, m) => m ? validValue(v, m) : !v;

const lastNonZeroValue = (vals) => {
	let nums = _.filter(vals, (val) => {
		return _.isInteger(val) && val !== 0;
	});
	return _.last(nums);
};

const addHatNormal = (m, vs, v, a) => {
	if (true !== m) {
		return false;
	}
	let last = lastNonZeroValue(vs);
	return last > 0 && a < 0 && (v + a) <= 0;
};
const addHatCrossed = (m, vs, v, a) => {
	if (true !== m) {
		return false;
	}
	let last = lastNonZeroValue(vs);
	return last < 0 && a > 0 && (v + a) >= 0;
};

const isUnplayedRefa = (i) => _.isPlainObject(i) && _.get(i, "middle", 22) === 0;

class PrefPaperColumn {

	constructor(value, middle = false) {
		if (!validStartValue(value, middle)) {
			throw new Error("PrefPaperColumn::constructor:Value is not valid " + value);
		}
		this.middle = middle;

		this.value = 0;
		this.values = [];
		if (middle && validStartValue(value, middle)) {
			this.value = value;
			this.values.push(this.value);
		}

		this.initialValue = this.value;
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

	addValue(value, invalidated = false) {
		if (!validValue(value, this.middle)) {
			throw new Error("PrefPaperColumn::addValue:Value is not valid " + value);
		}

		if (invalidated) {
			this.values.push({invalidated: true, value: this.value + value});

		} else {
			this.processHatAddition(value);

			this.value += value;
			if (this.value !== 0) {
				this.values.push(this.value);
			}
		}
		return this;
	}

	processHatAddition(value) {
		if (addHatNormal(this.middle, this.values, this.value, value)) {
			this.values.push({hat: 1});
		} else if (addHatCrossed(this.middle, this.values, this.value, value)) {
			this.values.push({hat: -1});
		}
	}

	addRefa() {
		if (!this.middle) {
			throw new Error("PrefPaperColumn::addRefa:Cannot add a refa to a soup column! this.middle=" + this.middle);
		}
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
		if (!this.middle) {
			throw new Error("PrefPaperColumn::markPlayedRefa:Cannot mark a refa in a soup column! this.middle=" + this.middle);
		}
		if (!validPosition(position)) {
			throw new Error("PrefPaperColumn::markPlayedRefa:Invalid position " + position);
		}
		let index = _.findIndex(this.values, (i) => _.get(i, position, 222) === 0);
		if (index < 0) {
			throw new Error("PrefPaperColumn::markPlayedRefa:No available refa found for position " + position);
		}
		_.set(this.values[index], position, (failed ? -1 : 1));
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
