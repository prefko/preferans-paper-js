#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperItem = require("./item");

class PrefPaperMiddleItem extends PrefPaperItem {

	constructor(middle) {
		super(middle);
		if (_.isBoolean(middle)) {
			delete this.value;
			this.refa = {
				left: 0,
				middle: 0,
				right: 0
			};
		}
		return this;
	}

	markPlayedRefa(position, passed) {
		if (0 !== _.get(this.refa, position)) {
			throw new Error("This refa has been played for " + position + " player: " + JSON.stringify(this.refa));
		}
		_.set(this.refa, position, (true === passed ? 1 : -1));
		return this;
	}

	isRefa() {
		return _.isPlainObject(this.refa);
	}

	isValue() {
		return _.isInteger(this.value);
	}

	isRefaAvailable(position) {
		return 0 === _.get(this.refa, position);
	}

	getValue() {
		if (true === this.undone) {
			return _.pickBy({
				undone: this.undone,
				value: this.value,
				refa: this.refa
			}, _.identity);
		}
		return this.value || this.refa;
	}

}

module.exports = PrefPaperMiddleItem;
