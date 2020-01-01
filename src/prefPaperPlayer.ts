#!/usr/bin/env node
"use strict";

export default class PrefPaperPlayer {
	private readonly _designation: 'p1' | 'p2' | 'p3';
	private readonly _tricks: number;
	private readonly _failed: boolean;

	constructor(designation: 'p1' | 'p2' | 'p3', tricks: number = 0, failed: boolean = false) {
		this._designation = designation;
		this._failed = failed;
		this._tricks = tricks;
	}

	get designation(): 'p1' | 'p2' | 'p3' {
		return this._designation;
	}

	get tricks(): number {
		return this._tricks;
	}

	get failed(): boolean {
		return this._failed;
	}

}
