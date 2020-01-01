#!/usr/bin/env node
"use strict";

import PrefPaperPlayer from "./prefPaperPlayer";

export default class PrefPaperFollower extends PrefPaperPlayer {
	private readonly _followed: boolean;

	constructor(designation: 'p1' | 'p2' | 'p3', followed: boolean, tricks: number = 0, failed: boolean = false) {
		super(designation, tricks, failed);
		this._followed = followed;
	}

	get followed() {
		return this._followed;
	}

}
