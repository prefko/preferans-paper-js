#!/usr/bin/env node
"use strict";

// TODO: MOVE to PrefScore
export default abstract class PrefScorePlayer {
	protected readonly _username: string;
	protected readonly _failed: boolean;

	protected constructor(username: string, failed = false) {
		this._username = username;
		this._failed = failed;
	}

	get username() {
		return this._username;
	}

	get failed() {
		return this._failed;
	}

	get main() {
		return false;
	}

	get follower() {
		return false;
	}
}

export class PrefScorePlayerMain extends PrefScorePlayer {
	get main() {
		return true;
	}
}

export class PrefScorePlayerFollower extends PrefScorePlayer {
	private readonly _followed: boolean;
	private readonly _tricks: number;

	constructor(username: string, followed: boolean, tricks: number, failed = false) {
		super(username, failed);
		this._followed = followed;
		this._tricks = tricks;
	}

	get followed() {
		return this._followed;
	}

	get tricks() {
		return this._tricks;
	}

	get follower() {
		return true;
	}
}
