import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { string } from "yup";

interface FormFieldProps{
  name:string;
  type:'textArea'|'text'|'number';
  label:string;
  onChange: (e: string | ChangeEvent<any>)=>void;
  error:boolean;
  value:string;
  errorMessage:string;
  className:string;
}

const FormField = ({name,type,label,onChange,error,value,errorMessage,className}:FormFieldProps) => {
  return (
    <TextField
    name={name}
    id={name}
    multiline={type == 'textArea'}
    rows={type == 'textArea' ? 4 : 1}
    type={type =='number' ? 'number' : 'text'}
    onChange={onChange}
    error={error}
    value={value}
    label={label}
    helperText={error ? errorMessage : ''}
    className={className}
    />
  )
}

export default FormField
