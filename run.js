#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaper = require("./src/prefPaper");

const _validFollowerData = ajv.compile({
	type: "object",
	properties: {
		followed: {type: "boolean", default: false},
		failed: {type: "boolean", default: false},
		tricks: {type: "integer", default: 0, minimum: 0, maximum: 5},
		value: {type: "integer", default: 0},
		mainPosition: {type: "string", enum: ["left", "right"]},
		repealed: {type: "boolean", default: false}
	},
	required: ["followed", "failed", "tricks", "value", "mainPosition", "repealed"],
	additionalProperties: false
});
console.log(++i, _validFollowerData({
	followed: true,
	tricks: 1,
	failed: true,
	value: 8,
	mainPosition: "right",
	repealed: false
}));
_validFollowerData.errors && console.log(_validFollowerData.errors);
