#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const even = (n) => n % 2 === 0;

class PrefPaperItem {

	constructor(value, invalidated = false) {
		if (!value || !_.isInteger(value) || !even(value) || value <= 0) {
			throw new Error("PrefPaperItem::constructor:Value is not valid " + value);
		}

		this.invalidated = invalidated;
		this.value = value;
		return this;
	}

	isInvalidated() {
		return this.invalidated;
	}

	isRefa() {
		return false;
	}

	getValue() {
		if (this.invalidated) {
			return {
				invalidated: true,
				value: this.value
			};
		}
		return this.value;
	}

}

module.exports = PrefPaperItem;
