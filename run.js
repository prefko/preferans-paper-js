#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaper = require("./lib/paper");
const PrefPaperPlayer = require("./lib/player");

// console.log(p);

const ajv = new Ajv({useDefaults: true});
const _validateHand = ajv.compile({
	type: "object",
	properties: {
		if: {properties: {newRefa: true}},
		then: {required: ["newRefa"]},
		else: {required: ["value", "main", "left", "right"]},
		value: {type: "integer", minimum: 0},
		main: {
			type: "object",
			properties: {
				username: {type: "string"},
				failed: {type: "boolean", default: false}
			},
			required: ["username"]
		},
		left: {
			type: "object",
			properties: {
				username: {type: "string"},
				followed: {type: "boolean", default: false},
				tricks: {type: "integer"},
				failed: {type: "boolean", default: false}
			},
			if: {properties: {followed: true}},
			then: {required: ["username", "tricks"]},
			else: {required: ["username"]}
		},
		right: {
			type: "object",
			properties: {
				username: {type: "string"},
				followed: {type: "boolean", default: false},
				tricks: {type: "integer"},
				failed: {type: "boolean", default: false}
			},
			if: {properties: {followed: true}},
			then: {required: ["username", "tricks"]},
			else: {required: ["username"]}
		},
		newRefa: {type: "boolean", default: false},
		invalidated: {type: "boolean", default: false}
	}
});
let i = 0;
console.log(++i, _validateHand({
	value: 10,
	main: {username: "p1"},
	left: {username: "p3", followed: true, tricks: 1, failed: true},
	right: {username: "p2", followed: true, tricks: 1, failed: true}
}));
console.log(++i, _validateHand({
	value: 10,
	main: {username: "p1"},
	left: {username: "p3", followed: true},
	right: {username: "p2"}
}));
