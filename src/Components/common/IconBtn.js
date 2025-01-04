import React from 'react';

const IconBtn = ({
    text,
    onClick,
    children,
    disabled = false,
    outline = false,
    customClasses = 'bg-yellow',
    type = 'button',
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`icon-btn ${outline ? 'outline' : ''} ${customClasses}`}
        >
            {children ? (
                <>
                    <span>{text}</span>
                    {children}
                </>
            ) : (
                text
            )}
        </button>
    );
};

export default IconBtn;
