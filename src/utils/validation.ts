import { ValidationError } from "./errors";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const validate = {
  uuid(value: unknown, field = 'id'): string {
    if (typeof value !== 'string' || !UUID_REGEX.test(value)) {
      throw new ValidationError(`Invalid ${field}: must be a valid UUID`);
    }
    return value;
  },

  string(value: unknown, field: string, minLength = 1, maxLength = 255): string {
    if (typeof value !== 'string') {
      throw new ValidationError(`Invalid ${field}: must be a string`);
    }
    const trimmed = value.trim();
    if (trimmed.length < minLength) {
      throw new ValidationError(`Invalid ${field}: must be at least ${minLength} character(s)`);
    }
    if (trimmed.length > maxLength) {
      throw new ValidationError(`Invalid ${field}: must be at most ${maxLength} characters`);
    }
    return trimmed;
  },

  optionalString(value: unknown, field: string, maxLength = 255): string | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    return this.string(value, field, 0, maxLength);
  },

  number(value: unknown, field: string, min?: number, max?: number): number {
    const num = typeof value === 'string' ? parseInt(value, 10) : value;
    if (typeof num !== 'number' || isNaN(num)) {
      throw new ValidationError(`Invalid ${field}: must be a number`);
    }
    if (min !== undefined && num < min) {
      throw new ValidationError(`Invalid ${field}: must be at least ${min}`);
    }
    if (max !== undefined && num > max) {
      throw new ValidationError(`Invalid ${field}: must be at most ${max}`);
    }
    return num;
  },

  optionalNumber(value: unknown, field: string, min?: number, max?: number): number | undefined {
    if (value === undefined || value === null || value === '') return undefined;
    return this.number(value, field, min, max);
  },

  enum<T extends string>(value: unknown, field: string, allowed: readonly T[]): T {
    if (typeof value !== 'string' || !allowed.includes(value as T)) {
      throw new ValidationError(`Invalid ${field}: must be one of ${allowed.join(', ')}`);
    }
    return value as T;
  }
};
