'use client';


import React, {useState} from 'react'
import style from './page.module.css'
import { useAppSelector } from '../redux/hooks';
import TournamentList from '../components/TournamentList/TournamentList';
import Link from 'next/link';
import UsersList from '../components/UsersList/UsersList';

export interface IDashboardProps { 

}
const Dashboard = (props : IDashboardProps) => {

  const user = useAppSelector(state => state?.userSlice)
  const [TabSelected, updateTabSelected] = useState <'managment_tournaments' | 'managment_users'>('managment_tournaments')

  const is_regular_user = user?.role_id?.can_participate_tournaments && !user?.role_id?.can_managment_tournaments && !user?.role_id?.can_managment_users
  const is_admin = user?.role_id?.can_managment_tournaments || user?.role_id?.can_managment_users

  return (  
    <div className={`${style.Dashboard} bg-primary`} >
      <div className={style.DashboardCard} >

        {is_regular_user ? 
          <TournamentList is_regular_user={true} is_admin={false} user_id={user?._id} />
        : null}

        {is_admin ? 
          <div className={style.DashboardCardContainerCards} >
            <div 
              className={`${style.DashboardCardContainerCardsCard} ${TabSelected === 'managment_tournaments' ? 'bg-primary' : 'bg-secondary'}`} 
              onClick={() => updateTabSelected('managment_tournaments')}
            >
              <p> Managment Tournaments </p>
            </div>
            <div 
              className={`${style.DashboardCardContainerCardsCard} ${TabSelected === 'managment_users' ? 'bg-primary' : 'bg-secondary'}`}
              onClick={() => updateTabSelected('managment_users')}
            >
              <p> Managment Users </p>
            </div>
          </div>
        : null}

        {is_admin && TabSelected === 'managment_tournaments' ? 
          <TournamentList is_regular_user={false} is_admin={true}  user_id={user?._id}/>
        :null}

        {is_admin && TabSelected === 'managment_users' ? 
          <UsersList user_id={user?._id} />
        :null}

      </div>
    </div>
  );
}
 
export default Dashboard;