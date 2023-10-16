import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface FilterInputProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const FilterInput: React.FC<FilterInputProps> = ({ options, value, onChange }) => {
    return (
        <Autocomplete
            options={options}
            freeSolo
            renderInput={(params) => (
                <TextField
                    {...params}
                    style={{
                        textAlign: "left",
                        marginTop: 79,
                        border: "none",
                        borderBottom: "1px solid #D3D3D3",
                        outline: "none",
                        width: "240px",
                        padding: "5px 10px",
                        fontSize: "16px"
                    }}
                    InputProps={{
                        ...params.InputProps,
                        disableUnderline: true,
                    }}
                    value={value}
                    placeholder="Know the character’s name?"
                    onChange={(e) => { onChange(e.target.value) }}
                />
            )}
        />
    );
}

export default FilterInput;
