'use client';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({children, className, ...buttonProps}: ButtonProps): React.JSX.Element => {
    return(
        <button className={`bg-action-background text-action-text ${className}`} {...buttonProps}>{children}</button>
    );
}

export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export const ButtonLink = ({children, className, ...buttonProps}: ButtonLinkProps): React.JSX.Element => {
    return(
        <a className={`bg-action-background text-action-text ${className}`} {...buttonProps}>{children}</a>
    );
}