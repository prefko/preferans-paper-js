#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const PrefPaper = require("./lib/paper");
const PrefPaperPlayer = require("./lib/player");

let p = new PrefPaper(60, 3, {
	unlimitedRefe: false,
	playPikOnRefa: false,
	lastHandDoubleFall: false,
	lastHandLimitSoup: false,
	failPikAfterRefas: false,
	failPikAfterOneUnderZero: false,
	allowSubAndMortKontras: false
});

// console.log(p);
