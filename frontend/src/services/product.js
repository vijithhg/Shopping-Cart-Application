import axios from 'axios'
import { API_URL } from '../constants/api'


const token = localStorage.getItem('token')

export const fetchProducts = async()=>{
    try{
        const response = await axios.get(`${API_URL}/products`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.products
    }catch(error){
        console.log(error)
    }
   
}