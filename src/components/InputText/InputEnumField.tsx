import React from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

type OptionType = {
    value: string
    label: string
}

type InputEnumFieldProps<T extends Record<string, string>> = {
    label: string
    onChange: (selectedOption: OptionType | null) => void
    enumType: Record<string, string>
    value?: OptionType
    className?: string
}

const InputEnumField = <T extends Record<string, string>>({
    label,
    onChange,
    enumType,
    value,
    className,
}: InputEnumFieldProps<T>) => {
    const options: OptionType[] = Object.entries(enumType).map(([key, value]) => ({
        value: key,
        label: value,
    }))

    const handleInputChange = (selectedOption: OptionType | null) => {
        if (selectedOption) {
            onChange(selectedOption)
        }
    }

    return (
        <div className={`relative mb-6 ${className}`}>
            <label className='block mb-2 text-sm font-medium text-head dark:text-white'>{label}</label>
            <CreatableSelect
                options={options}
                onChange={handleInputChange}
                placeholder='Select or create...'
                // value={value}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? '#094067' : '#5f6c7b',
                        color: '#5f6c7b',
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 2,
                    colors: {
                        ...theme.colors,
                        primary25: '#d8eefe',
                        primary: '#094067',
                        neutral10: '#d8eefe',
                        neutral20: '#5f6c7b',
                    },
                })}
                classNames={{
                    input: () => '[&_input:focus]:ring-0 px-0 py-2.5',
                    control: (state) => (state.isFocused ? 'border-red-600' : 'border-grey-300'),
                }}
            />
        </div>
    )
}

export default InputEnumField
