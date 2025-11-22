'use client';

import { SelectHTMLAttributes } from "react";

/**
 * Props for the Input component, extends native HTML input attributes
 */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Styled text input component with consistent styling.
 * Extends native HTML input with full-width layout and border styling.
 * 
 * @example
 * ```tsx
 * <Input
 *   type="text"
 *   placeholder="Enter name"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 *   required
 * />
 * ```
 */
export const Input = ({className, ...inputProps}: InputProps): React.JSX.Element => {
    return(
        <input
            className={`w-full p-2 border rounded ${className}`}
            {...inputProps}
        />
    );
}


/**
 * Props for the Select component, extends native HTML select attributes
 */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Styled select dropdown component with consistent styling.
 * Extends native HTML select with full-width layout and border styling.
 * 
 * @example
 * ```tsx
 * <Select value={type} onChange={(e) => setType(e.target.value)}>
 *   <option value="beer">Beer</option>
 *   <option value="wine">Wine</option>
 * </Select>
 * ```
 */
export const Select = ({className, ...selectProps}: SelectProps): React.JSX.Element => {
    return(
        <select
            className={`w-full p-2 border rounded ${className}`}
            {...selectProps}
        />
    );
}