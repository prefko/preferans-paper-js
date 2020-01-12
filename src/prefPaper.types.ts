#!/usr/bin/env node
'use strict';

export type PrefDesignation = 'p1' | 'p2' | 'p3';
export type PrefPaperObject = { designation: PrefDesignation, left: object[], middle: object[], right: object[] };
export type PrefPaperMiniObject = { designation: PrefDesignation, left: number, middle: number, right: number };

export type PrefPaperEntryHatObject = { hat: number };

export type PrefPaperEntryNumberRepealedObject = { value: number, repealed: boolean };

export type PrefPaperEntryRefaObject = { left: number, middle: number, right: number };
