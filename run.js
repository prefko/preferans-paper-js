#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaper = require("./lib/paper");
const PrefPaperPlayer = require("./lib/player");

// console.log(p);

const Ajv = require("ajv");
const ajv = new Ajv({useDefaults: true});
const _validHand = ajv.compile({
	oneOf: [{
		type: "object",
		properties: {
			newRefa: {type: "boolean", enum: [true]},
			invalidated: {type: "boolean", default: false},
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
						tricks: {type: "integer"},
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
						tricks: {type: "integer"},
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
			invalidated: {type: "boolean", default: false},
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

console.log(++i, _validHand({
	value: 10,
	main: {username: "p1", failed: true},
	left: {username: "p3"},
	right: {username: "p2"}
}));
_validHand.errors && console.log(_validHand.errors);
