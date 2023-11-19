'use client';


import React from 'react'
import style from './page.module.css'
import { useAppSelector } from '../redux/hooks';

export interface IDashboardProps { 

}

const Dashboard = (props : IDashboardProps) => {


  const user = useAppSelector(state => state?.userSlice)

  const { can_managment_tournaments, can_managment_users , can_participate_tournaments }  = user?.role_id

  // console.log('can_participate_tournaments', can_participate_tournaments)
  // console.log('can_managment_tournaments', can_managment_tournaments)
  // console.log('can_managment_users', can_managment_users)

  return (  
    <div className={`${style.Dashboard} bg-primary`} >
      <div className={style.DashboardCard} >
        <p> dashboard </p>
      </div>
    </div>
  );
}
 
export default Dashboard;