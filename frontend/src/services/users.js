import axios from "axios"
import { API_URL } from "../constants/api"

export const getAllUsers = async(token)=>{
    try{
        const response = await axios.get(`${API_URL}/user`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data.users
    }catch(error){
        console.log(error)
    }
   
}