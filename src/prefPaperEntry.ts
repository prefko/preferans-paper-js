#!/usr/bin/env node
"use strict";

export abstract class PrefPaperEntry {

	isNumber(): boolean {
		return false;
	}

	isRefa(): boolean {
		return false;
	}

	isHat(): boolean {
		return false;
	}

}

export class PrefPaperNumberEntry extends PrefPaperEntry {

	private _value: number;

	constructor(value: number) {
		super();
		this._value = value;
	}

	isNumber(): boolean {
		return true;
	}

}
