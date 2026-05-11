/**
 * Validators — Validaciones genéricas reutilizables.
 */

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const isRequired = (value) => value !== null && value !== undefined && value.toString().trim() !== '';
export const minLength = (value, min) => value && value.length >= min;
export const maxLength = (value, max) => value && value.length <= max;
