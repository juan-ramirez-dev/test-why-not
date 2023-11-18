'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import loginImage from '@/public/login-poster.png'
import { http } from '@/app/utils/http';

import style from './page.module.css'
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';


export interface IFormLoginInputs {
  email : string
  password : string
}

const Page = () => {

  const [FormLoginInputs, updateFormLoginInputs] = useState <IFormLoginInputs>({
    email : '',
    password : ''
  })

  const onLogin = async () => {
    
    const response = await http({
      url : '/api/auth',
      method: 'POST',
      data : {
        password : FormLoginInputs?.password || '',
        email : FormLoginInputs?.email || ''
      }
    })

    console.log('response', response)
  }

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    updateFormLoginInputs({
      ...FormLoginInputs,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div className={`${style.loginContainer} bg-primary`} >
      <div className={style.loginContainerForm} >
        
        <div className={style.loginContainerFormText}>
          
          <div>
            <h1 className='text-primary' > Login </h1>
            <br />
            <p>Please enter your credentials to continue</p>
          </div>

          <div className={style.loginContainerFormTextInputs} >
            <CustomInput 
              type="email" 
              onChange={onChange} 
              name='email'
              value={FormLoginInputs?.email}
              placeholder='xxxxxxxx@xxxxx.com'
            />
            <CustomInput 
              type="password" 
              onChange={onChange} 
              name='password'
              value={FormLoginInputs?.password}
              placeholder='*********'
            />

            <CustomButton onClick={() => onLogin()} text='Sign In' />  
            <p>Dont have an account? <a href="/register" className='text-secondary' >Register</a></p>

            <div className={style.lineBig} />
            <div className={style.lineLittle} />
          </div>


        </div>

        <Image 
          src={loginImage}
          className={style.imageResponsive}
          alt='Login Image'
        />
      </div>
    </div>
  );
}
 
export default Page;