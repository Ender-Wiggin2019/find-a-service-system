import React, { ChangeEvent } from 'react';

type InputTextFieldProps = {
    label: string;
    type: 'email' | 'password' | 'text';
    placeholder: string;
    onChange: (value: string) => void;
};

const InputTextField: React.FC<InputTextFieldProps> = ({
                                                           label,
                                                           type,
                                                           placeholder,
                                                           onChange,
                                                       }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="relative mb-6" data-te-input-wrapper-init>
            <label
                htmlFor={type}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id={`FormControlInput${type}`}
                placeholder={placeholder}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default InputTextField;
