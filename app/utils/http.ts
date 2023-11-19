import axios from 'axios';
import Swal from 'sweetalert2';

export interface IUseQuery {
  url : string
  data : any
  method : 'POST' | 'GET' | 'PUT' | 'DELETE'
}


export const http = async (params : IUseQuery) => {

  try {
    const response = await axios({
      method : params?.method,
      url : params?.url,
      data : params?.data
    })
  
    if(response?.data?.code === 500){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response?.data?.message || 'Algo salió mal',
      })
      return null
    }
  
    return response?.data
  
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salió mal',
    })
    console.log('error', error)
    return null
  }
}