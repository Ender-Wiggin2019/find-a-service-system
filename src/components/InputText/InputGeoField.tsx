import React from 'react';
import Select, { MultiValue } from 'react-select';
import { UkCities} from '~/data/uk-cities';

type OptionType = {
    value: string;
    label: string;
};

type InputGeoFieldProps = {
    label: string;
    onChange: (selectedOptions: OptionType[]) => void;
    value?: OptionType[];
    className?: string;
};

const options: OptionType[] = Object.entries(UkCities).map(([key, value]) => ({
    value: key,
    // label: `${key} (${value})`,
    label: `${key}`,
}));

const InputGeoField: React.FC<InputGeoFieldProps> = ({
                                                         label,
                                                         onChange,
                                                         className,
                                                     }) => {
    const handleInputChange = (selectedOptions: MultiValue<OptionType> | null) => {
        if (selectedOptions) {
            onChange(selectedOptions as OptionType[]);
        }
    };


    return (
        <div className={`relative mb-6 ${className}`}>
            <label className="block mb-2 text-sm font-medium text-head dark:text-white">
                {label}
            </label>
            <Select
                options={options}
                isMulti
                onChange={handleInputChange}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? '#094067' : '#5f6c7b',
                        color: '#5f6c7b'
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
                    input: () => "[&_input:focus]:ring-0 px-2 py-2.5",
                    control: (state) =>
                        state.isFocused ? 'border-red-600' : 'border-grey-300',
                }}
                // value={value}
            />
        </div>
    );
};

export default InputGeoField;
