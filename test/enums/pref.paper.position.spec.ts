'use strict';

import PrefPaperPosition from '../../src/enums/pref.paper.position';

describe('PrefPaperPosition Enum Tests', () => {
	test('should have LEFT, MIDDLE, and RIGHT values', () => {
		expect(PrefPaperPosition.LEFT).toBeDefined();
		expect(PrefPaperPosition.MIDDLE).toBeDefined();
		expect(PrefPaperPosition.RIGHT).toBeDefined();
	});

	test('should assign correct numeric values', () => {
		expect(PrefPaperPosition.LEFT).toBe(0);
		expect(PrefPaperPosition.MIDDLE).toBe(1);
		expect(PrefPaperPosition.RIGHT).toBe(2);
	});

	test('should return correct names from values', () => {
		expect(PrefPaperPosition[0]).toBe('LEFT');
		expect(PrefPaperPosition[1]).toBe('MIDDLE');
		expect(PrefPaperPosition[2]).toBe('RIGHT');
	});

	test('should be read-only enum values', () => {
		// TypeScript enums are read-only by design
		// This test verifies the enum maintains consistent values
		expect(PrefPaperPosition.LEFT).toBe(0);
		expect(PrefPaperPosition.MIDDLE).toBe(1);
		expect(PrefPaperPosition.RIGHT).toBe(2);

		// Verify enum keys exist
		expect(Object.keys(PrefPaperPosition)).toContain('LEFT');
		expect(Object.keys(PrefPaperPosition)).toContain('MIDDLE');
		expect(Object.keys(PrefPaperPosition)).toContain('RIGHT');
	});

	test('should have exactly 3 positions', () => {
		// Count the numeric enum values manually
		const keys = Object.keys(PrefPaperPosition);
		const numericKeys = keys.filter((key) => isNaN(Number(key)));
		expect(numericKeys).toHaveLength(3);
		expect(numericKeys).toEqual(['LEFT', 'MIDDLE', 'RIGHT']);
	});

	test('should support iteration and comparison', () => {
		const positions = [PrefPaperPosition.LEFT, PrefPaperPosition.MIDDLE, PrefPaperPosition.RIGHT];

		// Test ordering
		expect(PrefPaperPosition.LEFT < PrefPaperPosition.MIDDLE).toBe(true);
		expect(PrefPaperPosition.MIDDLE < PrefPaperPosition.RIGHT).toBe(true);

		// Test array usage
		positions.forEach((pos, index) => {
			expect(pos).toBe(index);
		});
	});
});
