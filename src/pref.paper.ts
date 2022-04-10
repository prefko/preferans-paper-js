'use strict';

import PrefPaperColumnSide from './pref.paper.column.side';
import PrefPaperPosition from './enums/pref.paper.position';
import PrefPaperColumnMiddle from './pref.paper.column.middle';
import PrefDesignationType from './types/pref.designation.type';
import PrefPaperObjectType from './types/pref.paper.object.type';
import PrefPaperMiniObjectType from './types/pref.paper.mini.object.type';

const _myPositionFromDesignations = (me: PrefDesignationType, main: PrefDesignationType): PrefPaperPosition.LEFT | PrefPaperPosition.RIGHT => {
	if (me === main) throw new Error('PrefPaper::_myPositionFromDesignations:Designations should not match! But: ' + me + '===' + main);

	if ('p1' === me) {
		if ('p2' === main) return PrefPaperPosition.RIGHT;
		return PrefPaperPosition.LEFT;
	} else if ('p2' === me) {
		if ('p3' === main) return PrefPaperPosition.RIGHT;
		return PrefPaperPosition.LEFT;
	} else {
		if ('p1' === main) return PrefPaperPosition.RIGHT;
		return PrefPaperPosition.LEFT;
	}
};

export default class PrefPaper {
	private readonly _designation: PrefDesignationType;
	private readonly _bula: number;
	private _left: PrefPaperColumnSide;
	private _middle: PrefPaperColumnMiddle;
	private _right: PrefPaperColumnSide;

	constructor(designation: PrefDesignationType, bula: number) {
		this._designation = designation;
		this._bula = bula;

		this._left = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
	}

	public reset(): PrefPaper {
		this._left = new PrefPaperColumnSide(PrefPaperPosition.LEFT);
		this._middle = new PrefPaperColumnMiddle(this._bula);
		this._right = new PrefPaperColumnSide(PrefPaperPosition.RIGHT);
		return this;
	}

	public processAsMain(value: number, designation: PrefDesignationType, failed: boolean) {
		if (designation !== this.designation) throw new Error('PrefPaper::processAsMain:Designations do not match. ' + this.designation + '!=' + designation);
		if (failed) this._markPlayedRefaFailed(PrefPaperPosition.MIDDLE);
		else this._markPlayedRefaPassed(PrefPaperPosition.MIDDLE);
		this._middle.addValue(failed ? value : -value);
		return this;
	}

	public processAsMainRepealed(value: number, designation: PrefDesignationType, failed: boolean) {
		if (designation !== this.designation) throw new Error('PrefPaper::processAsMain:Designations do not match. ' + this.designation + '!=' + designation);
		this._middle.addValueRepealed(failed ? value : -value);
		return this;
	}

	public processAsFollower(value: number, designation: PrefDesignationType, tricks: number, failed: boolean, mainsDesignation: PrefDesignationType): PrefPaper {
		if (designation !== this.designation) throw new Error('PrefPaper::processAsFollower:Designations do not match. ' + this.designation + '!=' + designation);
		const supa = value * tricks;
		const mainsPosition = _myPositionFromDesignations(designation, mainsDesignation);
		if (PrefPaperPosition.LEFT === mainsPosition) this._addLeftSupa(supa);
		else this._addRightSupa(supa);
		if (failed) this._middle.addValue(value);
		return this;
	}

	public processAsFollowerRepealed(value: number, designation: PrefDesignationType, tricks: number, failed: boolean, mainsDesignation: PrefDesignationType): PrefPaper {
		if (designation !== this.designation) throw new Error('PrefPaper::processAsFollowerRepealed:Designations do not match. ' + this.designation + '!=' + designation);
		const supa = value * tricks;
		const mainsPosition = _myPositionFromDesignations(designation, mainsDesignation);
		if (PrefPaperPosition.LEFT === mainsPosition) this._addLeftSupaRepealed(supa);
		else this._addRightSupaRepealed(supa);
		if (failed) this._middle.addValueRepealed(value);
		return this;
	}

	public addNewRefa(): PrefPaper {
		this._middle.addRefa();
		return this;
	}

	public hasUnplayedRefa(): boolean {
		return this._middle.hasOpenRefa(PrefPaperPosition.MIDDLE);
	}

	private _markPlayedRefaPassed(position: PrefPaperPosition): PrefPaper {
		if (this._middle.hasOpenRefa(position)) this._middle.markPlayedRefaPassed(position);
		return this;
	}

	private _markPlayedRefaFailed(position: PrefPaperPosition): PrefPaper {
		if (this._middle.hasOpenRefa(position)) this._middle.markPlayedRefaFailed(position);
		return this;
	}

	private _addLeftSupa(value: number): PrefPaper {
		this._left.addValue(value);
		return this;
	}

	private _addLeftSupaRepealed(value: number): PrefPaper {
		this._left.addValueRepealed(value);
		return this;
	}

	private _addRightSupa(value: number): PrefPaper {
		this._right.addValue(value);
		return this;
	}

	private _addRightSupaRepealed(value: number): PrefPaper {
		this._right.addValueRepealed(value);
		return this;
	}

	get designation(): PrefDesignationType {
		return this._designation;
	}

	get left(): number {
		return this._left.value;
	}

	get middle(): number {
		return this._middle.value;
	}

	get right(): number {
		return this._right.value;
	}

	get mini(): PrefPaperMiniObjectType {
		return {
			designation: this._designation,
			left: this.left,
			middle: this.middle,
			right: this.right
		};
	}

	get json(): PrefPaperObjectType {
		return {
			designation: this._designation,
			left: this._left.json,
			middle: this._middle.json,
			right: this._right.json
		};
	}
}
