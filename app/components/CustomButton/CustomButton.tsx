import React from 'react'
import style from './CustomButton.module.css'


export interface ICustomButton {
  text : string
  onClick : () => void
}

const CustomButton = (props : ICustomButton) => {

  return (
    <button 
      className={style.CustomButton}
      onClick={props?.onClick}
    >
      <p className={style.CustomButtonText}> 
        {props?.text} 
      </p>
    </button>
  );
}
 
export default CustomButton;