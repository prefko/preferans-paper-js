let schema = {
	"$id": "http://example.com/example.json",
	"type": "object",
	"properties": {
		"value": {
			"$id": "/properties/value",
			"type": "integer",
			"title": "The Value Schema ",
			"default": 0,
			"examples": [
				10
			]
		},
		"main": {
			"$id": "/properties/main",
			"type": "object",
			"properties": {
				"username": {
					"$id": "/properties/main/properties/username",
					"type": "string",
					"title": "The Username Schema ",
					"default": "",
					"examples": [
						"p1"
					]
				},
				"failed": {
					"$id": "/properties/main/properties/failed",
					"type": "boolean",
					"title": "The Failed Schema ",
					"default": false,
					"examples": [
						false
					]
				}
			},
			"required": [
				"username"
			]
		},
		"left": {
			"$id": "/properties/left",
			"type": "object",
			"if": {
				"properties": {
					"followed": true
				}
			},
			"then": {
				"required": [
					"tricks"
				]
			},
			"properties": {
				"username": {
					"$id": "/properties/left/properties/username",
					"type": "string",
					"title": "The Username Schema ",
					"default": "",
					"examples": [
						"p3"
					]
				},
				"followed": {
					"$id": "/properties/left/properties/followed",
					"type": "boolean",
					"title": "The Followed Schema ",
					"default": false,
					"examples": [
						true
					]
				},
				"tricks": {
					"$id": "/properties/left/properties/tricks",
					"type": "integer",
					"title": "The Tricks Schema ",
					"default": 0,
					"examples": [
						2
					]
				},
				"failed": {
					"$id": "/properties/left/properties/failed",
					"type": "boolean",
					"title": "The Failed Schema ",
					"default": false,
					"examples": [
						false
					]
				}
			},
			"required": [
				"username"
			]
		},
		"right": {
			"$id": "/properties/right",
			"type": "object",
			"if": {
				"properties": {
					"followed": true
				}
			},
			"then": {
				"required": [
					"tricks"
				]
			},
			"properties": {
				"username": {
					"$id": "/properties/right/properties/username",
					"type": "string",
					"title": "The Username Schema ",
					"default": "",
					"examples": [
						"p2"
					]
				},
				"followed": {
					"$id": "/properties/right/properties/followed",
					"type": "boolean",
					"title": "The Followed Schema ",
					"default": false,
					"examples": [
						true
					]
				},
				"tricks": {
					"$id": "/properties/right/properties/tricks",
					"type": "integer",
					"title": "The Tricks Schema ",
					"default": 0,
					"examples": [
						1
					]
				},
				"failed": {
					"$id": "/properties/right/properties/failed",
					"type": "boolean",
					"title": "The Failed Schema ",
					"default": false,
					"examples": [
						false
					]
				}
			},
			"required": [
				"username"
			]
		},
		"refa": {
			"$id": "/properties/refa",
			"type": "boolean",
			"title": "The Refa Schema ",
			"default": false,
			"examples": [
				false
			]
		},
		"newRefa": {
			"$id": "/properties/newRefa",
			"type": "boolean",
			"title": "The Newrefa Schema ",
			"default": false,
			"examples": [
				false
			]
		},
		"invalidated": {
			"$id": "/properties/invalidated",
			"type": "boolean",
			"title": "The Invalidated Schema ",
			"default": false,
			"examples": [
				false
			]
		}
	}
};

const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const validate = ajv.compile(schema);

function test(data) {
	var valid = validate(data);
	if (valid) console.log('Valid!');
	else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}

test({
	"value": 10,
	"main": {
		"username": "p1",
		"failed": false
	},
	"left": {
		"username": "p3",
		"followed": true,
		"tricks": 2
	},
	"right": {
		"username": "p2",
		"followed": true,
		"tricks": 2
	},
	"newRefa": false
});
