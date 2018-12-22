#!/usr/bin/env node
"use strict";

export default class PrefPaperFollower {
	protected readonly _username: string;
	protected readonly _failed: boolean;
	private readonly _followed: boolean;
	private readonly _tricks: number;

	constructor(username: string, followed: boolean, tricks: number, failed = false) {
		this._username = username;
		this._failed = failed;
		this._followed = followed;
		this._tricks = tricks;
	}

	get username() {
		return this._username;
	}

	get failed() {
		return this._failed;
	}

	get followed() {
		return this._followed;
	}

	get tricks() {
		return this._tricks;
	}
}
