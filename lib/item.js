#!/usr/bin/env node
"use strict";

const _ = require("lodash");

class PrefPaperItem {

	constructor(value) {
		this.value = value;
		return this;
	}

	undo() {
		this.undone = true;
		return this;
	}

	redo() {
		delete this.undone;
		return this;
	}

	isUndone() {
		return true === this.undone;
	}

	getValue() {
		return (true === this.undone) ? this.value : -this.value;
	}

}

module.exports = PrefPaperItem;
