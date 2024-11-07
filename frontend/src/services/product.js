import axios from 'axios'
import { API_URL } from '../constants/api'


export const fetchProducts = async(token)=>{
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

export const updateProductById = async(token,id,stockQuantity)=>{
    try{
        const response = await axios.put(`${API_URL}/products/${id}`,{
            stockQuantity
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}