#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPapers = require("./lib/paper");
const PrefPapersPaper = require("./lib/player");

// console.log(p);

const Ajv = require("ajv");
const ajv = new Ajv({useDefaults: true});
const _validHand = ajv.compile({
	oneOf: [{
		type: "object",
		properties: {
			newRefa: {type: "boolean", enum: [true]},
			repealed: {type: "boolean", default: false},
		},
		required: ["newRefa"],
		additionalProperties: false
	}, {
		type: "object",
		properties: {
			value: {type: "integer", minimum: 0},
			main: {
				type: "object",
				properties: {
					username: {type: "string"},
					failed: {type: "boolean", default: false}
				},
				required: ["username"],
				additionalProperties: false
			},
			left: {
				oneOf: [{
					type: "object",
					properties: {
						username: {type: "string"},
						followed: {type: "boolean", enum: [true]},
						tricks: {type: "integer", minimum: 0, maximum: 5},
						failed: {type: "boolean", default: false}
					},
					required: ["username", "followed", "tricks"],
					additionalProperties: false
				}, {
					type: "object",
					properties: {
						username: {type: "string"},
						failed: {type: "boolean", default: false}
					},
					required: ["username"],
					additionalProperties: false
				}]
			},
			right: {
				oneOf: [{
					type: "object",
					properties: {
						username: {type: "string"},
						followed: {type: "boolean", enum: [true]},
						tricks: {type: "integer", minimum: 0, maximum: 5},
						failed: {type: "boolean", default: false}
					},
					required: ["username", "followed", "tricks"],
					additionalProperties: false
				}, {
					type: "object",
					properties: {
						username: {type: "string"},
						failed: {type: "boolean", default: false}
					},
					required: ["username"],
					additionalProperties: false
				}]
			},
			repealed: {type: "boolean", default: false},
		},
		required: ["value", "main", "left", "right"],
		additionalProperties: false
	}]
});
let i = 0;
// console.log(++i, _validHand({newRefa: false}));
// console.log(++i, _validHand({value: 10}));
// console.log(++i, _validHand({newRefa: true}));
// console.log(++i, _validHand({
// 	value: 10,
// 	main: {username: "p1", failed: true},
// 	left: {username: "p3"},
// 	right: {username: "p2"}
// }));
// _validHand.errors && console.log(_validHand.errors);
//
// console.log("");
// console.log(++i, _validHand({
// 	value: 10,
// 	main: {username: "p1"},
// 	left: {username: "p3", followed: true},
// 	right: {username: "p2"}
// }));
// _validHand.errors && console.log(_validHand.errors);
// console.log(++i, _validHand({
// 	value: 10,
// 	main: {username: "p1"},
// 	left: {username: "p3"},
// 	right: {username: "p2", followed: true}
// }));
// _validHand.errors && console.log(_validHand.errors);

// console.log(++i, _validHand({
// 	value: 10,
// 	main: {username: "p1", failed: true},
// 	left: {username: "p3"},
// 	right: {username: "p2"}
// }));
// _validHand.errors && console.log(_validHand.errors);

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
