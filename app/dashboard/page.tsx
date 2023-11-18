import React from 'react'

import style from './page.module.css'

export interface IDashboardProps { 

}

const Dashboard = (props : IDashboardProps) => {
  return (  
    <div className={style.Dashboard} >
      <p> dashboard </p>
    </div>
  );
}
 
export default Dashboard;