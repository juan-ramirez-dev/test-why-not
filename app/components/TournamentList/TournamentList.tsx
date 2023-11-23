import React, { useEffect, useState } from 'react'
import { UserState } from '@/app/redux/features/userSlice'
import style from './TournamentList.module.css'
import { http } from '@/app/utils/http'
import Modal from '@/app/components/TournamentList/Modal/Modal'
import CustomButton from '../CustomButton/CustomButton'
import Swal from 'sweetalert2'
import { useRouter } from "next/navigation";

export interface ITournamentList {
  name : string
  description : string
  price : number
  participants ?: string[]
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

  const router = useRouter();

  useEffect(() => {
    getTournamentList()
  }, [])

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

  const openModal = (editMode: boolean, initialData?: ITournamentList) => {
    setIsEditMode(editMode);
    setTournamentFormData(initialData || { name: '', description: '' , price : 0});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTournamentFormData(null);
  };

  const handleSaveTournament = async (data: ITournamentList, isEditMode : boolean) => {

    if(!data?.name || !data?.description || !data?.price){
      return Swal.fire({
        icon : 'error',
        title : 'Error',
        text : 'Empty fields'
      })
    }

    let params : any = {
      name: data?.name,
      description: data?.description,
      participants: isEditMode ? tournamentFormData?.participants : [],
      createdBy: props?.user_id,
      price : data?.price,
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

  const handleRegister = async (tournamentId : string | undefined) => {
    if(!tournamentId) return 
    
    const response = await http({
      method : 'POST',
      url : '/api/payments/mercado-pago/checkout',
      data : { tournament_id : tournamentId, user_id : props?.user_id }
    })

    if(response) router.push(response.url)
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
            className={`
              ${style.DashboardCardContainerTournamentsItem} 
              ${item?.participants?.includes(props?.user_id) ? style.UserIncluded : ''}
            `}
            key={idx}
          >
            <div>
              <p> <strong> Title: </strong> {item?.name} </p>
              <p> <strong> Description: </strong> {item?.description} </p>
              <p> <strong> Price: </strong> {item?.price} </p>
              <p> <strong> Author: </strong> {item?.createdBy?.name} </p>
            </div>

            {props?.is_admin?
              <CustomButton text='Edit' onClick={() => openModal(true,item)} />
            :null}
            
            {props?.is_admin && item?._id ?
              <CustomButton text='Delete' onClick={() => handleDeleteTournament(item?._id)} />
            :null}


            {props?.is_regular_user && !item?.participants?.includes(props?.user_id) ? 
              <CustomButton 
                text='Register' 
                onClick={() => handleRegister(item?._id)}
              />
            : null}

            {props?.is_regular_user && item?.participants?.includes(props?.user_id) ? 
              <p> <strong> You are already participating in this tournament </strong> </p>
            :null}

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