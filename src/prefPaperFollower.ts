#!/usr/bin/env node
"use strict";

export default class PrefPaperFollower {
	private readonly _username: string;
	private readonly _followed: boolean;
	private readonly _tricks: number;
	private readonly _failed: boolean;

	constructor(username: string, followed: boolean, tricks: number, failed = false) {
		this._username = username;
		this._failed = failed;
		this._followed = followed;
		this._tricks = tricks;
	}

	get username() {
		return this._username;
	}

	get followed() {
		return this._followed;
	}

	get tricks() {
		return this._tricks;
	}

	get failed() {
		return this._failed;
	}

}
