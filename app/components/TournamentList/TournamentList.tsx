import React, { useEffect, useState } from 'react'
import { UserState } from '@/app/redux/features/userSlice'
import style from './TournamentList.module.css'
import { http } from '@/app/utils/http'
import Modal from '@/app/api/tournaments/Modal/Modal'
import CustomButton from '../CustomButton/CustomButton'

export interface ITournamentList {
  name : string
  description : string
  participants ?: UserState[]
  createdBy ?: UserState
  _id ?: string
  createdAt ?: string | Date
  updatedAt ?: string | Date
}

export interface ITournamentListProps {
  is_admin : boolean
  is_regular_user : boolean
  user_id : string
}


const TournamentList = (props : ITournamentListProps) => {

  const [TournamentList, setTournamentList] = useState<ITournamentList[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentFormData, setTournamentFormData] = useState<ITournamentList | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getTournamentList()
  }, [])

  const openModal = (editMode: boolean, initialData?: ITournamentList) => {
    setIsEditMode(editMode);
    setTournamentFormData(initialData || { name: '', description: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTournamentFormData(null);
  };

  const handleSaveTournament = async (data: ITournamentList, isEditMode : boolean) => {

    let params : any = {
      name: data?.name,
      description: data?.description,
      participants: isEditMode ? tournamentFormData?.participants : [],
      createdBy: props?.user_id
    }

    if(isEditMode) params = {...params, tournamentId : tournamentFormData?._id}

    const response = await http({
      method : isEditMode ? 'PUT' : 'POST',
      url : '/api/tournaments',
      data : params
    })

    if(response?.code === 200){
      await getTournamentList()
      closeModal()
    }
  };

  const getTournamentList = async () => {
    const response = await http({
      method : 'GET',
      url : '/api/tournaments',
      data : null
    })

    if(response?.code === 200){
      setTournamentList(response?.response)
    }
  } 

  const handleDeleteTournament = async (tournamentId : string | undefined) => {
    if(!tournamentId) return 
    const response = await http({
      method : 'DELETE',
      url : '/api/tournaments',
      data : { tournamentId }
    })

    if(response?.code === 200){
      await getTournamentList()
    }
  }

  return (
    <div>
      <div className={style.DashboardCardContainerHeader} >
        <h3> Tournament List, </h3>
        {props?.is_admin ? <p> Here you can manage tournaments, create, edit or delete tournaments </p> :null}
        {props?.is_regular_user ? <p> Here you can register for any tournament.</p> :null}
      </div>

      
      <div className={style.DashboardCardContainerTournaments} >
        {TournamentList?.length ? TournamentList.map((item : ITournamentList, idx : number) => 
          <div 
            className={style.DashboardCardContainerTournamentsItem}
            key={idx}
          >
            <div>
              <p> <strong> Title: </strong> {item?.name} </p>
              <p> <strong> Description: </strong> {item?.description} </p>
              <p> <strong> Author: </strong> {item?.createdBy?.name} </p>
            </div>

            {props?.is_admin?
              <CustomButton text='Edit' onClick={() => openModal(true,item)} />
            :null}
            
            {props?.is_admin && item?._id ?
              <CustomButton text='Delete' onClick={() => handleDeleteTournament(item?._id)} />
            :null}


            {props?.is_regular_user ? 
              <CustomButton text='Register' onClick={() => openModal(true,item)} />
            : null}

          </div>
        ) : null}

        {props?.is_admin ? 
          <div 
            className={style.DashboardCardContainerTournamentsItem}
            style={{cursor : 'pointer', justifyContent : 'center', alignItems : 'center', display : 'flex'}}
            onClick={() => openModal(false)}
          >
            <p> <strong> + </strong> </p>
          </div>
      : null}
      </div>

      {isModalOpen ? 
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveTournament}
          isEditMode={isEditMode}
          initialData={tournamentFormData}
        />
      : null}

    </div>
  );
}
 
export default TournamentList;