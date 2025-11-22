'use client';

import { default as NextLink } from "next/link";
import actionClasses from './Actions.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: 'primary' | 'secondary' | 'outline';
};

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

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
};
export const ButtonLink = ({className, ...linkProps}: LinkProps): React.JSX.Element => {
    return(
        <NextLink className={`${actionClasses.btn} bg-action-background text-action-text w-full p-3 rounded ${className}`} {...linkProps} />
    );
}
export const Link = ({className, ...linkProps}: LinkProps): React.JSX.Element => {
    return(
        <NextLink className={`ml-2 text-action text-sm hover:underline ${className}`} {...linkProps} />
    );
}