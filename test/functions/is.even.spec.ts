'use strict';

import isEven from '../../src/functions/is.even';

describe('isEven function tests', () => {
	describe('positive even numbers', () => {
		it('should return true for 0', () => {
			expect(isEven(0)).toBe(true);
		});

		it('should return true for 2', () => {
			expect(isEven(2)).toBe(true);
		});

		it('should return true for 4', () => {
			expect(isEven(4)).toBe(true);
		});

		it('should return true for 10', () => {
			expect(isEven(10)).toBe(true);
		});

		it('should return true for 100', () => {
			expect(isEven(100)).toBe(true);
		});

		it('should return true for 1000', () => {
			expect(isEven(1000)).toBe(true);
		});
	});

	describe('positive odd numbers', () => {
		it('should return false for 1', () => {
			expect(isEven(1)).toBe(false);
		});

		it('should return false for 3', () => {
			expect(isEven(3)).toBe(false);
		});

		it('should return false for 5', () => {
			expect(isEven(5)).toBe(false);
		});

		it('should return false for 11', () => {
			expect(isEven(11)).toBe(false);
		});

		it('should return false for 99', () => {
			expect(isEven(99)).toBe(false);
		});

		it('should return false for 1001', () => {
			expect(isEven(1001)).toBe(false);
		});
	});

	describe('negative even numbers', () => {
		it('should return true for -2', () => {
			expect(isEven(-2)).toBe(true);
		});

		it('should return true for -4', () => {
			expect(isEven(-4)).toBe(true);
		});

		it('should return true for -10', () => {
			expect(isEven(-10)).toBe(true);
		});

		it('should return true for -100', () => {
			expect(isEven(-100)).toBe(true);
		});
	});

	describe('negative odd numbers', () => {
		it('should return false for -1', () => {
			expect(isEven(-1)).toBe(false);
		});

		it('should return false for -3', () => {
			expect(isEven(-3)).toBe(false);
		});

		it('should return false for -11', () => {
			expect(isEven(-11)).toBe(false);
		});

		it('should return false for -99', () => {
			expect(isEven(-99)).toBe(false);
		});
	});

	describe('edge cases and special numbers', () => {
		it('should return true for very large even number', () => {
			expect(isEven(999998)).toBe(true);
		});

		it('should return false for very large odd number', () => {
			expect(isEven(999999)).toBe(false);
		});

		it('should return true for very large even number (2^53 - 2)', () => {
			// Using 2^53 - 2 which is the largest safe even integer
			const evenLargeNumber = 9007199254740990;
			expect(isEven(evenLargeNumber)).toBe(true);
		});

		it('should return false for very large odd number (2^53 - 1)', () => {
			// Using 2^53 - 1 which is the largest safe odd integer
			const oddLargeNumber = 9007199254740991;
			expect(isEven(oddLargeNumber)).toBe(false);
		});
	});

	describe('preferans-specific values', () => {
		it('should return true for common preferans scores that are even', () => {
			const evenScores = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
			evenScores.forEach((score) => {
				expect(isEven(score)).toBe(true);
			});
		});

		it('should return false for common preferans scores that are odd', () => {
			const oddScores = [15, 25, 35, 45, 55, 65, 75, 85, 95];
			oddScores.forEach((score) => {
				expect(isEven(score)).toBe(false);
			});
		});

		it('should return true for typical starting bula values (even)', () => {
			const evenBulaValues = [60, 100, 120, 140, 160, 200];
			evenBulaValues.forEach((bula) => {
				expect(isEven(bula)).toBe(true);
			});
		});

		it('should return false for invalid bula values (odd)', () => {
			const oddBulaValues = [59, 61, 99, 101, 121, 141];
			oddBulaValues.forEach((bula) => {
				expect(isEven(bula)).toBe(false);
			});
		});
	});

	describe('array-based comprehensive tests', () => {
		it('should correctly identify all even numbers in a range', () => {
			for (let i = 0; i <= 20; i += 2) {
				expect(isEven(i)).toBe(true);
			}
		});

		it('should correctly identify all odd numbers in a range', () => {
			for (let i = 1; i <= 19; i += 2) {
				expect(isEven(i)).toBe(false);
			}
		});

		it('should handle mixed positive and negative numbers correctly', () => {
			const testCases = [
				{number: -10, expected: true},
				{number: -9, expected: false},
				{number: -2, expected: true},
				{number: -1, expected: false},
				{number: 0, expected: true},
				{number: 1, expected: false},
				{number: 2, expected: true},
				{number: 9, expected: false},
				{number: 10, expected: true}
			];

			testCases.forEach(({number, expected}) => {
				expect(isEven(number)).toBe(expected);
			});
		});
	});
});
