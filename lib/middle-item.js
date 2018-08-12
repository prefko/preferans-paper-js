#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaperItem = require("./item");

const validPosition = (position) => position === "left" || position === "middle" || position === "right";

class PrefPaperMiddleItem extends PrefPaperItem {

	constructor(middle, invalidated) {
		if (_.isBoolean(middle)) {
			super(10, invalidated);
			delete this.value;
			this.refa = {
				left: 0,
				middle: 0,
				right: 0
			};
		} else {
			super(middle, invalidated);
		}
		return this;
	}

	isRefa() {
		return _.isPlainObject(this.refa);
	}

	isValue() {
		return _.isInteger(this.value);
	}

	isRefaAvailable(position) {
		if (!this.isRefa()) {
			throw new Error("PrefPaperMiddleItem::isRefaAvailable:This item is not a refa " + this.value);
		}
		if (!validPosition(position)) {
			throw new Error("PrefPaperMiddleItem::isRefaAvailable:Invalid position " + position);
		}
		return 0 === _.get(this.refa, position, 99);
	}

	markPlayedRefa(position, failed = false) {
		if (!this.isRefa()) {
			throw new Error("PrefPaperMiddleItem::isRefaAvailable:This item is not a refa " + this.value);
		}
		if (!validPosition(position)) {
			throw new Error("PrefPaperMiddleItem::markPlayedRefa:Invalid position " + position);
		}
		if (!this.isRefaAvailable(position)) {
			throw new Error("PrefPaperMiddleItem::markPlayedRefa:This refa has already been played for " + position + " player " + JSON.stringify(this.refa));
		}
		_.set(this.refa, position, (failed ? -1 : 1));
		return this;
	}

	getValue() {
		if (this.invalidated) {
			return _.pickBy({
				invalidated: true,
				value: this.value,
				refa: this.refa
			}, _.identity);
		}
		return this.value || this.refa;
	}

}

module.exports = PrefPaperMiddleItem;
