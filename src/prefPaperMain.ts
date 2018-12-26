#!/usr/bin/env node
"use strict";

export default class PrefPaperMain {
	private readonly _username: string;
	private readonly _tricks: number = 0;
	private readonly _failed: boolean = false;

	constructor(username: string, tricks: number = 0, failed: boolean = false) {
		this._username = username;
		this._failed = failed;
		this._tricks = tricks;
	}

	get username() {
		return this._username;
	}

	get tricks() {
		return this._tricks;
	}

	get failed() {
		return this._failed;
	}

}
