#!/usr/bin/env node
"use strict";

const _ = require("lodash");

class PrefPaperItem {

	constructor(value, invalidated = false) {
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
