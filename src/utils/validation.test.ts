import { describe, it, expect } from 'vitest';
import { validate, ValidationError } from './validation';

describe('validate.uuid', () => {
  it('accepts valid UUIDs', () => {
    expect(validate.uuid('123e4567-e89b-12d3-a456-426614174000')).toBe('123e4567-e89b-12d3-a456-426614174000');
  });

  it('rejects invalid UUIDs', () => {
    expect(() => validate.uuid('not-a-uuid')).toThrow(ValidationError);
    expect(() => validate.uuid('123')).toThrow('Invalid id: must be a valid UUID');
  });

  it('uses custom field name in error', () => {
    expect(() => validate.uuid('invalid', 'eventId')).toThrow('Invalid eventId');
  });
});

describe('validate.string', () => {
  it('trims and returns valid strings', () => {
    expect(validate.string('  hello  ', 'name')).toBe('hello');
  });

  it('rejects non-strings', () => {
    expect(() => validate.string(123, 'name')).toThrow('Invalid name: must be a string');
  });

  it('enforces minimum length', () => {
    expect(() => validate.string('', 'name', 1)).toThrow('Invalid name: must be at least 1 character(s)');
    expect(() => validate.string('  ', 'name', 1)).toThrow('Invalid name: must be at least 1 character(s)');
  });

  it('enforces maximum length', () => {
    expect(() => validate.string('a'.repeat(256), 'name', 1, 255)).toThrow('Invalid name: must be at most 255 characters');
  });
});

describe('validate.optionalString', () => {
  it('returns undefined for empty values', () => {
    expect(validate.optionalString(undefined, 'field')).toBeUndefined();
    expect(validate.optionalString(null, 'field')).toBeUndefined();
    expect(validate.optionalString('', 'field')).toBeUndefined();
  });

  it('validates non-empty strings', () => {
    expect(validate.optionalString('  test  ', 'field')).toBe('test');
  });

  it('enforces max length', () => {
    expect(() => validate.optionalString('a'.repeat(256), 'field', 255)).toThrow();
  });
});

describe('validate.number', () => {
  it('accepts valid numbers', () => {
    expect(validate.number(42, 'score')).toBe(42);
    expect(validate.number('42', 'score')).toBe(42);
  });

  it('rejects invalid numbers', () => {
    expect(() => validate.number('abc', 'score')).toThrow('Invalid score: must be a number');
    expect(() => validate.number(NaN, 'score')).toThrow('Invalid score: must be a number');
  });

  it('enforces minimum value', () => {
    expect(() => validate.number(0, 'score', 1)).toThrow('Invalid score: must be at least 1');
  });

  it('enforces maximum value', () => {
    expect(() => validate.number(11, 'score', 1, 10)).toThrow('Invalid score: must be at most 10');
  });
});

describe('validate.optionalNumber', () => {
  it('returns undefined for empty values', () => {
    expect(validate.optionalNumber(undefined, 'year')).toBeUndefined();
    expect(validate.optionalNumber(null, 'year')).toBeUndefined();
    expect(validate.optionalNumber('', 'year')).toBeUndefined();
  });

  it('validates non-empty numbers', () => {
    expect(validate.optionalNumber(2024, 'year')).toBe(2024);
    expect(validate.optionalNumber('2024', 'year')).toBe(2024);
  });

  it('enforces min/max', () => {
    expect(() => validate.optionalNumber(1799, 'year', 1800, 2100)).toThrow();
    expect(() => validate.optionalNumber(2101, 'year', 1800, 2100)).toThrow();
  });
});

describe('validate.enum', () => {
  it('accepts valid enum values', () => {
    expect(validate.enum('beer', 'type', ['beer', 'wine', 'whiskey'])).toBe('beer');
  });

  it('rejects invalid enum values', () => {
    expect(() => validate.enum('vodka', 'type', ['beer', 'wine', 'whiskey']))
      .toThrow('Invalid type: must be one of beer, wine, whiskey');
  });

  it('rejects non-strings', () => {
    expect(() => validate.enum(123, 'type', ['beer', 'wine'])).toThrow();
  });
});
