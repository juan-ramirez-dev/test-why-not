'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import loginImage from '@/public/login-poster.png'
import { http } from '@/app/utils/http';
import style from './page.module.css'
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';
import { useRouter } from 'next/navigation';
import { LoginAction } from '../redux/features/authSlice';
import { updateUserAction } from '../redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google'
import decodeJwt from '../utils/decodeJWT';

export interface IFormLoginInputs {
  email : string
  password : string
}

const LoginPage = () => {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const auth = useAppSelector(state => state?.authSlice)
  if(auth?.isLoggedIn) router.push('/dashboard')

  const [FormLoginInputs, updateFormLoginInputs] = useState <IFormLoginInputs>({
    email : '',
    password : ''
  })

  const onLogin = async (customEmail ?: string, isGoogle ? : boolean) => {
    
    const response = await http({
      url : '/api/auth/login',
      method: 'POST',
      data : {
        password : FormLoginInputs?.password || '',
        email : customEmail || FormLoginInputs?.email || '',
        is_google : isGoogle || false
      }
    })

    if(response?.code === 200){

      dispatch(LoginAction({isLoggedIn : true}))
      dispatch(updateUserAction({...response?.response}))
      router.push('/dashboard')
    }
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
            <p>Dont have an account? <Link href="/register" className='text-secondary' >Register</Link></p>
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
            <GoogleLogin
              onSuccess={credentialResponse => {
                if(credentialResponse?.credential){
                  const {payload} = decodeJwt(credentialResponse?.credential)
                  onLogin(payload?.email, true)
                }
              }}
            />

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
 
export default LoginPage;