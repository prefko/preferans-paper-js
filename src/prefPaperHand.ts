#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';

const _validHand = {
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
};

export default class PrefPaperHand {
	private _left: any;
	private _main: any;
	private _right: any;

	constructor() {
	}

}
