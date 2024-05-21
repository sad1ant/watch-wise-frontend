import React from 'react';

interface RangeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const RangeInput: React.FC<RangeInputProps> = (props) => {
    return (
        <input
            type="range"
            {...props}
            className="w-full h-1 appearance-none rounded bg-purple-400 outline-none slider-thumb"
        />
    );
}

export default RangeInput;