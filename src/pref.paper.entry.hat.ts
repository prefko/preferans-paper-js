'use strict';

import PrefPaperEntry from './pref.paper.entry';
import PrefPaperEntryHatObjectType from './types/pref.paper.entry.hat.object.type';

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

	get json(): PrefPaperEntryHatObjectType {
		return {hat: this._crossed ? -1 : 1};
	}
}
