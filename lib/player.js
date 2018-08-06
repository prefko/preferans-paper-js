#!/usr/bin/env node
'use strict';

const _ = require('lodash');

class PrefPaperPlayer {
	constructor(username, bula, refe = 0, options = {}) {
		if (!username) throw new Error("No name defined", username);
		if (!bula) throw new Error("No bula defined", bula);

		this.username = username;
		this.bula = bula;
		this.refe = refe;
		this.options = _.clone(options);
		this.left = [];
		this.middle = [];
		this.right = [];

		return this;
	}

	getPlayerJSON() {
		return {
			// TODO
		};
	}

}

module.exports = PrefPaperPlayer;
