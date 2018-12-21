#!/usr/bin/env node
"use strict";

import {PrefScorePlayerFollower, PrefScorePlayerMain} from "./prefScorePlayer";

// TODO: MOVE to PrefScore
export default abstract class PrefScoreHand {
	protected _repealed: boolean;

	protected constructor(repealed: boolean) {
		this._repealed = repealed;
	}

	get repealed() {
		return this._repealed;
	}

	set repealed(repealed: boolean) {
		this._repealed = repealed;
	}

	get refa() {
		return false;
	}

	get played() {
		return false;
	}
}

export class PrefScoreHandRefa extends PrefScoreHand {
	constructor(repealed = false) {
		super(repealed);
	}

	get refa() {
		return true;
	}
}

export class PrefScoreHandPlayed extends PrefScoreHand {
	private _value: number;
	private _left: PrefScorePlayerFollower;
	private _middle: PrefScorePlayerMain;
	private _right: PrefScorePlayerFollower;

	constructor(value: number, left: PrefScorePlayerFollower, middle: PrefScorePlayerMain, right: PrefScorePlayerFollower, repealed = false) {
		super(repealed);

		this._value = value;
		this._left = left;
		this._middle = middle;
		this._right = right;
	}

	get played() {
		return true;
	}
}
