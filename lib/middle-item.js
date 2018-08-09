#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperItem = require("./item");

const setPlayedRefa = (refa, position, passed) => {
	if (0 === _.get(refa, position)) {
		_.set(refa, position, (true === passed ? 1 : -1));
	}
	return refa;
};

class PrefPaperMiddleItem extends PrefPaperItem {

	constructor(middle) {
		super(middle);
		if (_.isBoolean(middle)) {
			delete this.value;
			this.refa = {
				left: 0,
				me: 0,
				right: 0
			};
		}
		return this;
	}

	setLeftPlayedRefa(passed) {
		this.refa = setPlayedRefa(this.refa, "left", passed);
		return this;
	}

	setMePlayedRefa(passed) {
		this.refa = setPlayedRefa(this.refa, "me", passed);
		return this;
	}

	setRightPlayedRefa(passed) {
		this.refa = setPlayedRefa(this.refa, "right", passed);
		return this;
	}

	isRefa() {
		return _.isPlainObject(this.refa);
	}

	isValue() {
		return _.isInteger(this.value);
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
