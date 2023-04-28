import React, { ChangeEvent } from 'react'

type InputCurrencyFieldProps = {
    label: string
    type: 'email' | 'password' | 'text'
    onChange: (value: string) => void
    value?: string
    disabled?: boolean
    isValid?: boolean
}

const InputCurrencyField: React.FC<InputCurrencyFieldProps> = ({ label, type, onChange, value, disabled, isValid }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className='relative mb-6'>
            <label htmlFor={type} className='block mb-2 text-sm font-medium text-head dark:text-white'>
                {label}
            </label>
            <div>
                <div className='relative mt-2 rounded-md shadow-sm'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                        <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                        type='text'
                        name='price'
                        id='price'
                        className={`border ${
                            isValid === false ? 'border-red-500' : 'border-subhead'
                        } text-head sm:text-sm rounded-sm focus:ring-subhead focus:border-head block w-full px-2.5 pl-7 dark:bg-subhead disabled:text-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                        placeholder='0.00'
                        onChange={handleInputChange}
                        value={value || undefined} // set value
                        disabled={disabled || false} // set disabled
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center'>
                        <label htmlFor='currency' className='sr-only'>
                            Currency
                        </label>
                        <select
                            id='currency'
                            name='currency'
                            className='h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-subhead sm:text-sm'
                        >
                            <option>per hour</option>
                            <option>per use</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InputCurrencyField
