#!/usr/bin/env node
'use strict';

const _ = require('lodash');
const PrefPaper = require('./lib/paper');
const PrefPaperPlayer = PrefPaper.PrefPaperPlayer;

const settings = {};
let p = new PrefPaper(60, 3, settings);

console.log(p);
