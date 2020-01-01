#!/usr/bin/env node
"use strict";

import PrefPaperEntry from "./prefPaperEntry";

export type PrefPaperEntryHatObject = { hat: number };

export default class PrefPaperEntryHat extends PrefPaperEntry {
	private _crossed: boolean = false;

	constructor() {
		super();
	}

	set crossed(crossed: boolean) {
		this._crossed = crossed;
	}

	get crossed(): boolean {
		return this._crossed;
	}

	get isHat(): boolean {
		return true;
	}

	get json(): PrefPaperEntryHatObject {
		return {hat: this._crossed ? -1 : 1};
	}
}
