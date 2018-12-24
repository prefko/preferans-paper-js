#!/usr/bin/env node
"use strict";

export default abstract class PrefPaperEntry {

	public static isEven(n: number): boolean {
		return n % 2 === 0;
	}

	get number(): boolean {
		return false;
	}

	get refa(): boolean {
		return false;
	}

	get hat(): boolean {
		return false;
	}

	abstract get json(): any;
};
