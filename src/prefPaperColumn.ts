#!/usr/bin/env node
"use strict";

import * as _ from 'lodash';
import {PrefPaperPosition} from './prefPaperEnums';
import {PrefPaperEntry} from "./prefPaperEntry";

export default abstract class PrefPaperColumn {
	protected _position: PrefPaperPosition;
	protected _values: Array<PrefPaperEntry>;
	protected _value: number;
	protected _initialValue: number;

	constructor(position: PrefPaperPosition) {
		this._position = position;

		this._values = new Array<PrefPaperEntry>();
		this._value = 0;
		this._initialValue = 0;
		this.reset();
	}

	reset(): PrefPaperColumn {
		this._values = new Array<PrefPaperEntry>();
		this._value = this._initialValue;
		return this;
	}

	addValue(value: number, invalidated = false): PrefPaperColumn {
		if (invalidated) this._values.push({invalidated: true, value: this.value + value});
		else this.processNewValue(value);
		return this;
	}

	// TODO: add abstract prefPaperColumnEntry class to be extended by numbers, refa and hat
	processNewValue(value: number): PrefPaperColumn {
		this._value += value;
		return this;
	}

	getValue() {	// TODO
		return this._value;
	}

	abstract getJSON(): any;

}
