import React from 'react'
import style from './CustomInput.module.css'

export interface ICustomInput {
  type : 'password' | 'email' | 'text' | 'number'
  onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
  value : string
  defaultValue ?: string
  name : string
  placeholder ?: string
  label ? : string
}

const CustomInput = (props : ICustomInput) => {
  return (
    <div className={style?.CustomInputContainer} >
      <label> {props?.label} </label>
      <input 
        type={props?.type} 
        onChange={props?.onChange} 
        name={props?.name}
        value={props?.value}
        defaultValue={props?.defaultValue}
        className={style?.CustomInput}
        placeholder={props?.placeholder}
      />
    </div>
  );
}
 
export default CustomInput;