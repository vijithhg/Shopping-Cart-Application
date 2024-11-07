import axios from 'axios'
import { API_URL } from '../constants/api'
import Swal from 'sweetalert2'


export const createOrder = async(token,payload)=>{
  
    try{
        const response = await axios.post(`${API_URL}/order`,
        payload
        ,{

            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        Swal.fire({
            title:'Error',
            text:error?.response?.data?.message,
            icon:'warning'
        }).then(()=>{
            window.location.href = '/cart'
          })
    }
}


export const clearCart = async(token)=>{
    try{
        const response = await axios.delete(`${API_URL}/cart`,{    
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            return response.data
    }catch(error){
        console.log(error)
    }
}