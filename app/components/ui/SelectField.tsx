import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface SelectFieldProps{
  options: string[];
  label:string;
  name:string;
  type:'select'|'multiSelect';
  onChange: (e: { target: { name: string; value: any } }) => void;  error?:boolean;
  value:any;
  errorMessage?:string;
  className:string
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectField = ({className,error,errorMessage,label,name,onChange,options,type,value}:SelectFieldProps) => {
    const [optName, setOptName] = useState<string[]>([]);
    const handleChange = (event: SelectChangeEvent<typeof optName>) => {
      const {
        target: { value },
      } = event;

      const newValue = typeof value === 'string' ? value.split(',') : value;

      setOptName(newValue);

      // أرسل التغيير لFormik:
      onChange({
        target: {
          name,
          value: newValue,
        },
      });
    };
  return (
    type == 'select' ?
      <TextField
        id={name}
        name={name}
        select
        defaultValue={options?.[0]}
        label={label}
        error={error}
        helperText={error ? errorMessage : ''}
        value={value}
        onChange={onChange}
        className={className}
      >
        {options.map((option,idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      :
      <div>
        <FormControl sx={{width: '100%' }}>
          <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={optName}
            onChange={handleChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {options.map((name) => (
              <MenuItem key={name} value={name.toLowerCase()}>
                <Checkbox checked={optName.includes(name.toLowerCase())} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    
  )
}

export default SelectField
