'use client';

import { default as NextLink } from "next/link";
import actionClasses from './Actions.module.css';

/**
 * Props for the Button component
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual style variant of the button */
    buttonType?: 'primary' | 'secondary' | 'outline';
};

/**
 * Styled button component with multiple visual variants.
 * Extends native HTML button with custom styling.
 * 
 * @example
 * ```tsx
 * <Button buttonType="primary" onClick={handleClick}>
 *   Submit
 * </Button>
 * ```
 */
export const Button = ({className, buttonType = 'primary', ...buttonProps}: ButtonProps): React.JSX.Element => {
    const primaryButtonClass = 'bg-action-background text-action-text border-action-background';
    const secondaryButtonClass = 'bg-secondary text-background';
    const outlineButtonClass = 'bg-background text-text border'

    let buttonClass = primaryButtonClass;
    if(buttonType === 'secondary'){
        buttonClass = secondaryButtonClass;
    } else if (buttonType === 'outline'){
        buttonClass = outlineButtonClass;
    }
    
    return(
        <button className={`${actionClasses.btn} ${buttonClass} w-full p-3 rounded ${className}`} {...buttonProps}/>
    );
}

/**
 * Props for link components
 */
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** URL path to navigate to */
    href: string;
};

/**
 * Button-styled Next.js Link component for navigation.
 * Renders as a full-width button with primary action styling.
 * 
 * @example
 * ```tsx
 * <ButtonLink href="/event/123">
 *   View Event
 * </ButtonLink>
 * ```
 */
export const ButtonLink = ({className, ...linkProps}: LinkProps): React.JSX.Element => {
    return(
        <NextLink className={`${actionClasses.btn} bg-action-background text-action-text w-full p-3 rounded ${className}`} {...linkProps} />
    );
}

/**
 * Inline text link component for navigation.
 * Renders as a small, underlined link with hover effects.
 * 
 * @example
 * ```tsx
 * <Link href="/event/123/edit">Edit</Link>
 * ```
 */
export const Link = ({className, ...linkProps}: LinkProps): React.JSX.Element => {
    return(
        <NextLink className={`ml-2 text-action text-sm hover:underline ${className}`} {...linkProps} />
    );
}