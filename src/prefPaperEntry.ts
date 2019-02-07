#!/usr/bin/env node
'use strict';

export default abstract class PrefPaperEntry {

	public static isEven(n: number): boolean {
		return n % 2 === 0;
	}

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
