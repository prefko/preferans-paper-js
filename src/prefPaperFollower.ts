#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';

const _validFollowerData = {
	type: "object",
	properties: {
		username: {type: "string"},
		followed: {type: "boolean", default: false},
		failed: {type: "boolean", default: false},
		tricks: {type: "integer", default: 0, minimum: 0, maximum: 5},
		value: {type: "integer", default: 0},
		mainPosition: {type: "string", enum: ["left", "right"]},
		repealed: {type: "boolean", default: false}
	},
	required: ["followed", "failed", "tricks", "value", "mainPosition", "repealed"],
	additionalProperties: false
};

export default class PrefPaperFollower {

	constructor() {
	}

}
