#!/usr/bin/env node
"use strict";

import PrefPaperEntry from "./prefPaperEntry";

export type PrefPaperEntryHatObject = { hat: number };

export default class PrefPaperEntryHat extends PrefPaperEntry {
	private readonly _isCrossed: boolean;

	constructor(crossed = false) {
		super();
		this._isCrossed = crossed;
	}

	get isCrossed(): boolean {
		return this._isCrossed;
	}

	get isHat(): boolean {
		return true;
	}

	get json(): PrefPaperEntryHatObject {
		return {hat: this._isCrossed ? -1 : 1};
	}
}
