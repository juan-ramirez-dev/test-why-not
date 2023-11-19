'use client'

import React from 'react'
import style from './Navbar.module.css'
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks'
import CustomButton from '../CustomButton/CustomButton'
import { useRouter } from 'next/navigation'
import { LogoutAction } from '@/app/redux/features/authSlice'

export interface INavbar {

}

const Navbar = (props : INavbar) => {

  const isLoggedIn = useAppSelector(state => state?.authSlice?.isLoggedIn)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const logOut = () => {
    dispatch(LogoutAction())
    router.push('/')
  }

  return (
    <div className={style.Navbar} >

      {isLoggedIn ? 
        <div className={style.navbarContainer} >
          <CustomButton className={style.secondButton} text='Sign off' onClick={() => logOut()} />
        </div>
      :
        <div className={style.navbarContainer} >
          <CustomButton className={style.firstButton} text='Sign In' onClick={() =>router.push('/login') } />
          <CustomButton className={style.secondButton} text='Register' onClick={() =>router.push('/register') } />
        </div>
      }

    </div>
  );
}
 
export default Navbar;