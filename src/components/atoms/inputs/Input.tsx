import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
    return (
        <input
            {...props}
            className="bg-dark-purple text-white border border-transparent rounded p-2 my-2 w-full placeholder-gray-400 focus:outline-none focus:border-white shadow-md"
        />
    )
}

export default Input