'use client';

import { SelectHTMLAttributes } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({className, ...inputProps}: InputProps): React.JSX.Element => {
    return(
        <input
            className={`w-full p-2 border rounded ${className}`}
            {...inputProps}
        />
    );
}


export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({className, ...selectProps}: SelectProps): React.JSX.Element => {
    return(
        <select
            className={`w-full p-2 border rounded ${className}`}
            {...selectProps}
        />
    );
}