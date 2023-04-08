import React, { ChangeEvent } from 'react'

type InputTextFieldProps = {
    label: string
    type: 'email' | 'password' | 'text'
    placeholder: string
    onChange: (value: string) => void
    value?: string
    disabled?: boolean
    isValid?: boolean
}

const InputTextField: React.FC<InputTextFieldProps> = ({
    label,
    type,
    placeholder,
    onChange,
    value,
    disabled,
    isValid,
}) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className='relative mb-6'>
            <label htmlFor={type} className='block mb-2 text-sm font-medium text-head dark:text-white'>
                {label}
            </label>
            <input
                type={type}
                className={`${
                    isValid === false ? 'border border-red-500' : ''
                } text-head sm:text-sm rounded-sm focus:ring-primary-600 focus:border-head block w-full p-2.5 py-3 dark:bg-subhead disabled:text-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                id={`FormControlInput${type}`}
                placeholder={placeholder}
                onChange={handleInputChange}
                value={value || undefined} // set value
                disabled={disabled || false} // set disabled
            />
        </div>
    )
}

export default InputTextField
