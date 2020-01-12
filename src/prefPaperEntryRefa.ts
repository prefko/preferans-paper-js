#!/usr/bin/env node
'use strict';

import { PrefPaperPosition } from './prefPaper.enums';
import PrefPaperEntry from './prefPaperEntry';
import { PrefPaperEntryRefaObject } from './prefPaper.types';

export default class PrefPaperEntryRefa extends PrefPaperEntry {
	private _left = 0;
	private _middle = 0;
	private _right = 0;

	public setPlayedPassed(position: PrefPaperPosition): PrefPaperEntryRefa {
		switch (position) {
			case PrefPaperPosition.LEFT:
				return this.setLeftPlayedPassed();
			case PrefPaperPosition.MIDDLE:
				return this.setMiddlePlayedPassed();
			case PrefPaperPosition.RIGHT:
				return this.setRightPlayedPassed();
		}
	}

	public setPlayedFailed(position: PrefPaperPosition): PrefPaperEntryRefa {
		switch (position) {
			case PrefPaperPosition.LEFT:
				return this.setLeftPlayedFailed();
			case PrefPaperPosition.MIDDLE:
				return this.setMiddlePlayedFailed();
			case PrefPaperPosition.RIGHT:
				return this.setRightPlayedFailed();
		}
	}

	public setLeftPlayedPassed(): PrefPaperEntryRefa {
		if (this.leftPlayed) throw new Error('PrefPaperEntryRefa::setLeftPlayedPassed:Left already marked as played!');
		this._left = 1;
		return this;
	}

	public setLeftPlayedFailed(): PrefPaperEntryRefa {
		if (this.leftPlayed) throw new Error('PrefPaperEntryRefa::setLeftPlayedFailed:Left already marked as played!');
		this._left = -1;
		return this;
	}

	public setMiddlePlayedPassed(): PrefPaperEntryRefa {
		if (this.middlePlayed) throw new Error('PrefPaperEntryRefa::setMiddlePlayedPassed:Middle already marked as played!');
		this._middle = 1;
		return this;
	}

	public setMiddlePlayedFailed(): PrefPaperEntryRefa {
		if (this.middlePlayed) throw new Error('PrefPaperEntryRefa::setMiddlePlayedFailed:Middle already marked as played!');
		this._middle = -1;
		return this;
	}

	public setRightPlayedPassed(): PrefPaperEntryRefa {
		if (this.rightPlayed) throw new Error('PrefPaperEntryRefa::setRightPlayedPassed:Right already marked as played!');
		this._right = 1;
		return this;
	}

	public setRightPlayedFailed(): PrefPaperEntryRefa {
		if (this.rightPlayed) throw new Error('PrefPaperEntryRefa::setRightPlayedFailed:Right already marked as played!');
		this._right = -1;
		return this;
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

	get isRefa(): boolean {
		return true;
	}

	get json(): PrefPaperEntryRefaObject {
		return {
			left: this._left,
			middle: this._middle,
			right: this._right,
		};
	}
}
