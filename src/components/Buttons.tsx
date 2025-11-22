'use client';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: 'primary' | 'secondary';
};

export const Button = ({className, buttonType = 'primary', ...buttonProps}: ButtonProps): React.JSX.Element => {
    const buttonClass = buttonType === 'primary' 
        ? 'bg-action-background text-action-text border-action-background'
        : 'bg-secondary text-background';
    
    return(
        <button className={`${buttonClass}  w-full p-3 rounded hover:bg-text hover:text-background ${className}`} {...buttonProps}/>
    );
}

export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export const ButtonLink = ({className, ...buttonProps}: ButtonLinkProps): React.JSX.Element => {
    return(
        <a className={`bg-action-background text-action-text w-full p-3 rounded ${className}`} {...buttonProps} />
    );
}