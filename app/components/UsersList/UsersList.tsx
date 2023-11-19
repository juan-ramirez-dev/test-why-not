import React, { useEffect, useState } from 'react'
import { UserState } from '@/app/redux/features/userSlice'
import { http } from '@/app/utils/http'
import Modal from '@/app/components/UsersList/Modal/Modal'
import CustomButton from '../CustomButton/CustomButton'

import style from './UsersList.module.css'
import Swal from 'sweetalert2'


export interface UserStateProps {
  user_id : string
}


const UsersList = (props : UserStateProps) => {

  const [UsersList, setUsersList] = useState<UserState[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersFormData, setUsersFormData] = useState<UserState | null>(null);

  useEffect(() => {
    getUsersList()
  }, [])

  const getUsersList = async () => {
    const response = await http({
      method : 'GET',
      url : '/api/users',
      data : null
    })

    if(response?.code === 200){
      setUsersList(response?.response)
    }
  } 

  const openModal = (initialData?: UserState) => {
    setUsersFormData(initialData || { name: '', email: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUsersFormData(null);
  };


  const handleSaveUsers = async (data: UserState) => {

    if(!data?.name || !data?.email || !usersFormData?._id){
      return Swal.fire({
        icon : 'error',
        title : 'Error',
        text : 'Empty fields'
      })
    }

    let params : any = {
      name: data?.name,
      email: data?.email,
      userId : usersFormData?._id
    }

    const response = await http({
      method : 'PUT',
      url : '/api/users',
      data : params
    })

    if(response?.code === 200){
      await getUsersList()
      closeModal()
    }
  };

  const handleDeleteUsers = async (userId : string | undefined) => {
    if(!userId) return 
    if(userId === props?.user_id){
      return Swal.fire({
        icon : 'error',
        title : 'Error',
        text : "you can't eliminate yourself"
      })
    }

    const sureDelete = await Swal.fire({
      title: "Do you want to delete this user?",
      showDenyButton: true,
      confirmButtonText: "Yes",
    })

    if(!sureDelete?.isConfirmed) return

    const response = await http({
      method : 'DELETE',
      url : '/api/users',
      data : { userId }
    })

    if(response?.code === 200){
      await getUsersList()
    }
  }

  return (
    <div>
      <div className={style.DashboardCardContainerHeader} >
        <h3> Users List, </h3>
        <p> Here you can manage users, edit or delete users </p>
      </div>

      
      <div className={style.DashboardCardContainerUsers} >
        {UsersList?.length ? UsersList.map((item : UserState, idx : number) => 
          <div 
            className={style.DashboardCardContainerUsersItem}
            key={idx}
          >
            <div>
              <p> <strong> Name: </strong> {item?.name} </p>
              <p> <strong> Email: </strong> {item?.email} </p>
            </div>
            
            <CustomButton text='Edit' onClick={() => openModal(item)} />
            <CustomButton text='Delete' onClick={() => handleDeleteUsers(item?._id)} />
          </div>
        ) : null}
      </div>

      {isModalOpen ? 
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveUsers}
          initialData={usersFormData}
        />
      : null}

    </div>
  );
}
 
export default UsersList;