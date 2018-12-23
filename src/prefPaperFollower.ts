#!/usr/bin/env node
"use strict";

import PrefPaperMain from "./prefPaperMain";

export default class PrefPaperFollower extends PrefPaperMain {
	private readonly _followed: boolean;

	constructor(username: string, followed: boolean, tricks: number, failed: boolean = false) {
		super(username, tricks, failed);
		this._followed = followed;
	}

	get followed() {
		return this._followed;
	}

}
