#!/usr/bin/env node
"use strict";

import {PrefPaperPosition} from "./prefPaperEnums";
import PrefPaperEntry from "./prefPaperEntry";

export type PrefPaperEntryRefaObject = { left: number, middle: number, right: number };

export default class PrefPaperEntryRefa extends PrefPaperEntry {
	private _left = 0;
	private _middle = 0;
	private _right = 0;

	public setPlayed(position: PrefPaperPosition, passed: boolean): PrefPaperEntryRefa {
		switch (position) {
			case PrefPaperPosition.LEFT:
				return this.setLeftPlayed(passed);
			case PrefPaperPosition.MIDDLE:
				return this.setMiddlePlayed(passed);
			case PrefPaperPosition.RIGHT:
				return this.setRightPlayed(passed);
		}
	}

	public setLeftPlayed(passed: boolean): PrefPaperEntryRefa {
		if (this.leftPlayed) {
			throw new Error("PrefPaperEntryRefa::setLeftPlayed:Left already marked as played!");
		}
		this._left = passed ? 1 : -1;
		return this;
	}

	public setMiddlePlayed(passed: boolean): PrefPaperEntryRefa {
		if (this.middlePlayed) {
			throw new Error("PrefPaperEntryRefa::setMiddlePlayed:Middle already marked as played!");
		}
		this._middle = passed ? 1 : -1;
		return this;
	}

	public setRightPlayed(passed: boolean): PrefPaperEntryRefa {
		if (this.rightPlayed) {
			throw new Error("PrefPaperEntryRefa::setRightPlayed:Right already marked as played!");
		}
		this._right = passed ? 1 : -1;
		return this;
	}

	get refa(): boolean {
		return true;
	}

	get leftPlayed(): boolean {
		return this._left !== 0;
	}

	get middlePlayed(): boolean {
		return this._middle !== 0;
	}

	get rightPlayed(): boolean {
		return this._right !== 0;
	}

	get json(): PrefPaperEntryRefaObject {
		return {
			left: this._left,
			middle: this._middle,
			right: this._right
		};
	}
}
