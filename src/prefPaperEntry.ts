#!/usr/bin/env node
'use strict';

export default abstract class PrefPaperEntry {

	get isNumber(): boolean {
		return false;
	}

	get isRefa(): boolean {
		return false;
	}

	get isHat(): boolean {
		return false;
	}

	abstract get json(): any;
};
