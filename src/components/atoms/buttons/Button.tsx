import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            className={`bg-light-purple text-white rounded p-2 px-4 hover:bg-dark-hover-purple transition-colors shadow-md ${className}`}
        >
            {children}
        </button>
    )
}

export default Button