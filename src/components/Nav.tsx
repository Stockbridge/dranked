'use client';
import {Logo} from './logo'
import React from "react";

/**
 * Simple navigation header component displaying the application name.
 * Currently displays "DRanked" branding.
 * 
 * @example
 * ```tsx
 * <Nav />
 * ```
 */
export const Nav = (): React.JSX.Element => {
    return (
        <nav className="flex justify-center items-center gap-2 font-bold text-1xl py-2 border-b border-secondary">
            <Logo />
            <span>dranked</span>
        </nav>
    );
}