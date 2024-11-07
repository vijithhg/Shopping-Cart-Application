import axios from 'axios'
import { API_URL } from '../constants/api'


const token = localStorage.getItem('token')

export const addItemToCart = async(_id,quantity)=>{
    try{
        const response = await axios.post(`${API_URL}/cart`,{
            productID:_id,
            quantity
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

export const getCartItemsCount = async(token)=>{
    try{
        const response = await axios.get(`${API_URL}/user/cart`,{

            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data?.items
    }catch(error){
        console.log(error)
    }
}

export const getCartByUser = async(token)=>{
    try{
        const response = await axios.get(`${API_URL}/user/cart`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }catch(error){
        console.log(error)
    }
}

export const updateCartByUser = async(token,productID,quantity)=>{
    try{
        const response = await axios.put(`${API_URL}/cart`,{
            productID,
            quantity
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


export const removeItemFromCart = async(token,productID)=>{
    try{
        const response = await axios.post(`${API_URL}/cart/remove`,{
            productID,
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