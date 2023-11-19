import React from 'react'
import style from './CustomButton.module.css'


export interface ICustomButton {
  text : string
  onClick : () => void
  className ?: string
  disabled ?: boolean
}

const CustomButton = (props : ICustomButton) => {

  return (
    <button 
      className={`${style.CustomButton} ${props?.className}`}
      onClick={props?.onClick}
      disabled={props?.disabled}
    >
      <p className={style.CustomButtonText}> 
        {props?.text} 
      </p>
    </button>
  );
}
 
export default CustomButton;