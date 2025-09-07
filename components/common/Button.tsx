import React from 'react';
import { ButtonProps } from '../../interfaces';

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
    const base = 'px-4 py-2 rounded focus:outline-none focus:ring';
    const style = variant === 'primary'
        ? 'bg-blue-600 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

    return (
        <button className={`${base} ${style}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
