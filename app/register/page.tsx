'use client';

import React, { useState } from 'react'
import Image from 'next/image';
import RegisterImage from '@/public/register-poster.png'
import { http } from '@/app/utils/http';
import style from './page.module.css'
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';
import { useRouter } from 'next/navigation';
import { LoginAction } from '../redux/features/authSlice';
import { updateUserAction } from '../redux/features/userSlice';
import { useAppDispatch } from '../redux/hooks';
import Link from 'next/link';
import Swal from 'sweetalert2';

export interface IFormLoginInputs {
  name : string
  email : string
  confirm_email : string
  password : string
  slug_rol : string
}

const Page = () => {

  const dispatch = useAppDispatch()
  const router = useRouter()
  const [FormLoginInputs, updateFormLoginInputs] = useState <IFormLoginInputs>({
    name : '',
    email : '',
    password : '',
    slug_rol : '',
    confirm_email : ''
  })

  const onRegister = async () => {


    if(FormLoginInputs?.email !== FormLoginInputs?.confirm_email){
      return Swal.fire({
        icon : 'error',
        title : 'Error',
        text : 'The emails do not match.'
      })
    }

    if(!FormLoginInputs?.email || !FormLoginInputs?.confirm_email || !FormLoginInputs?.name || !FormLoginInputs?.password){
      return Swal.fire({
        icon : 'error',
        title : 'Error',
        text : 'The emails do not match.'
      })
    }

    const response = await http({
      url : '/api/auth/register',
      method: 'POST',
      data : {
        password : FormLoginInputs?.password || '',
        email : FormLoginInputs?.email || '',
        name : FormLoginInputs?.name || '',
        slug_rol : FormLoginInputs?.slug_rol || ''
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
            <h1 className='text-primary' > Register </h1>
            <br />
            <p>Please enter your credentials to continue</p>
            <p>have an account? <Link href="/login" className='text-secondary' > Sign In </Link></p>
          </div>

          <div className={style.loginContainerFormTextInputs} >
            <CustomInput 
              type="email" 
              onChange={onChange} 
              name='email'
              value={FormLoginInputs?.email}
              placeholder='xxxxxxxx@xxxxx.com'
              label='Email *'
            />
            <CustomInput 
              type="email" 
              onChange={onChange} 
              name='confirm_email'
              value={FormLoginInputs?.confirm_email}
              placeholder='xxxxxxxx@xxxxx.com'
              label='Confirm your email *'

            />
            <CustomInput 
              type="password" 
              onChange={onChange} 
              name='password'
              value={FormLoginInputs?.password}
              placeholder='*********'
              label='Password *'
            />
            <CustomInput 
              type="text" 
              onChange={onChange} 
              name='slug_rol'
              value={FormLoginInputs?.slug_rol}
              placeholder='xxxx-xxxx-xxxx-xxxx'
              label='Rol code'
            />

            <CustomButton onClick={() => onRegister()} text='Register' />  

          </div>
        </div>

        <Image 
          src={RegisterImage}
          className={style.imageResponsive}
          alt='Login Image'
        />
      </div>
    </div>
  );
}
 
export default Page;