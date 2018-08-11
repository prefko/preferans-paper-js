#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperItem = require("./item");

const validPosition = (position) => position === "left" || position === "middle" || position === "right";

class PrefPaperMiddleItem extends PrefPaperItem {

	constructor(middle, invalidated) {
		super(middle, invalidated);

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
		if (!validPosition(position)) {
			throw new Error("PrefPaperMiddleItem::markPlayedRefa:Invalid position " + position);
		}
		if (0 !== _.get(this.refa, position, 99)) {
			throw new Error("PrefPaperMiddleItem::markPlayedRefa:This refa has been played for " + position + " player " + JSON.stringify(this.refa));
		}
		_.set(this.refa, position, (!!passed ? 1 : -1));
		return this;
	}

	isRefa() {
		return _.isPlainObject(this.refa);
	}

	isValue() {
		return _.isInteger(this.value);
	}

	isRefaAvailable(position) {
		if (!validPosition(position)) {
			throw new Error("PrefPaperMiddleItem::isRefaAvailable:Invalid position " + position);
		}
		return 0 === _.get(this.refa, position, 99);
	}

	getValue() {
		if (!!this.invalidated) {
			return _.pickBy({
				invalidated: this.invalidated,
				value: this.value,
				refa: this.refa
			}, _.identity);
		}
		return this.value || this.refa;
	}

}

module.exports = PrefPaperMiddleItem;
